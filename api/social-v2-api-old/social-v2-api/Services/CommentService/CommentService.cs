using AutoMapper;
using Microsoft.EntityFrameworkCore;
using social_v2_api.Entities;
using social_v2_api.Repositories.EfRepository;
using social_v2_api.Services.CommentService.Dtos;
using social_v2_api.Services.FeedService.Dtos;
using System.Xml.Linq;

namespace social_v2_api.Services.CommentService
{
  public class CommentService : BaseService, ICommentService
  {
    private readonly IEfRepository<CommentEntity> _commentRepo;
    private readonly IEfRepository<FeedEntity> _feedRepo;
    private readonly IMapper _mapper;
    public CommentService(
      IEfRepository<CommentEntity> commentRepo,
        IEfRepository<FeedEntity> feedRepo,
      IMapper mapper,
      IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
    {
      _mapper = mapper;
      _commentRepo = commentRepo;
      _feedRepo = feedRepo;
    }

    public CommentDto CreateComment(long feedId, long? parentId, CreateUpdateComment model)
    {
      if (_feedRepo.Find(feedId) == null)
        throw new Exception("Feed is not found");

      var newEntity = new CommentEntity()
      {
        FeedId = feedId,
        Content = model.Content,
        MediaUrl = model.MediaUrl,
        CreatorId = Id,
        LikeCount = 0,
        ReplyCount = 0,
      };

      if (parentId.HasValue && parentId > 0)
      {
        var parentEntity = _commentRepo.Find(parentId)
          ?? throw new Exception("Parent comment is not found");

        newEntity.ParentId = parentEntity.Id;
        newEntity.Parent = parentEntity;
        newEntity.Childs = null;
      }
      newEntity = _commentRepo.Insert(newEntity);

      UpdateFeedCommentCount(feedId);
      UpdateReplyCount(parentId);

      var dto = _mapper.Map<CommentDto>(newEntity);
      dto.Owned = true;
      return dto;
    }

    public void DeleteComment(long? commentId)
    {
      var comment = _commentRepo.Find(commentId)
        ?? throw new Exception("Comment doen not exist.");

      if (comment.CreatorId != Id)
        throw new Exception("You do not have permissions to delete this comment.");

      _commentRepo.Delete(comment);
    }

    public IEnumerable<CommentDto> GetCommentsByFeedId(long feedId)
    {
      var comments = _commentRepo
        .GetQueryableNoTracking()
        .Include(comment => comment.Creator)
        //.Include(comment => comment.Childs.OrderByDescending(comment => comment.ReplyCount).Take(1))
        .Include(comment => comment
          .Childs
          .OrderByDescending(comment => comment.ReplyCount)
          
          )
        .ThenInclude(comment => comment.Creator)
        .Where(comment => comment.FeedId == feedId)
        .ToList();

      return comments.Select(comment =>
      {
        var dto = _mapper.Map<CommentDto>(comment);

        dto.Owned = comment.CreatorId == Id;
        dto.Childs = dto.Childs.Select(child =>
        {
          child.Owned = child.Creator.Id == Id;
          return child;
        })
        .ToList();
        return dto;
      });
    }

    public CommentDto UpdateComment(long commentId, CreateUpdateComment model)
    {
      var comment = _commentRepo.Find(commentId)
        ?? throw new Exception("Comment does not exist.");

      if (model == null)
        throw new NullReferenceException(nameof(model));

      if ((!string.IsNullOrEmpty(model.MediaUrl) && !string.IsNullOrEmpty(model.MediaType)) || !string.IsNullOrEmpty(model.Content))
      {
        if (!string.IsNullOrEmpty(model.Content))
          comment.Content = model.Content;

        if ((!string.IsNullOrEmpty(model.MediaUrl) && !string.IsNullOrEmpty(model.MediaType)))
        {
          comment.MediaUrl = model.MediaUrl;
          comment.MediaType = model.MediaType;
        }
      }
      else throw new Exception("Invalid body");
      var dto = _mapper.Map<CommentDto>(_commentRepo.Update(commentId, comment));
      dto.Owned = true;
      return dto;
    }
    private void UpdateFeedCommentCount(long feedId)
    {
      var feed = _feedRepo.Find(feedId);
      var commentCount = _commentRepo
        .GetQueryableNoTracking()
        .Where(x => x.FeedId == feed.Id)
        .Count();

      feed.CommentCount = commentCount;
      _feedRepo.Update(feedId, feed);
    }

    private void UpdateReplyCount(long? parentId)
    {
      if (parentId == null)
        return;

      var comment = _commentRepo.Find(parentId);
      var childCount = _commentRepo
        .GetQueryableNoTracking()
        .Where(x => x.ParentId == parentId)
        .Count();

      comment.ReplyCount = childCount;
      _commentRepo.Update((long)parentId, comment);
    }
  }
}
