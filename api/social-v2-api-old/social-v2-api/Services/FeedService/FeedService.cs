using AutoMapper;
using Microsoft.EntityFrameworkCore;
using social_v2_api.Entities;
using social_v2_api.Repositories.EfRepository;
using social_v2_api.Services.FeedService.Dtos;

namespace social_v2_api.Services.FeedService
{
  public class FeedService : BaseService, IFeedService
  {
    private readonly IEfRepository<CommentEntity> _commentRepo;
    private readonly IEfRepository<MediaEntity> _mediaRepo;
    private readonly IEfRepository<FeedEntity> _feedRepo;
    private readonly IMapper _mapper;
    public FeedService(
      IEfRepository<FeedEntity> feedRepo,
      IEfRepository<CommentEntity> commentRepo,
      IEfRepository<MediaEntity> mediaRepo,
      IMapper mapper,
      IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
    {
      _mapper = mapper;
      _feedRepo = feedRepo;
      _commentRepo = commentRepo;
      _mediaRepo = mediaRepo;
    }
    public FeedDto CreateFeed(RequestCreateFeed model)
    {

      if (string.IsNullOrEmpty(model.Caption) && !model.Medias.Any())
        throw new Exception("Invalid body");

      var newEntity = new FeedEntity
      {
        CreatorId = Id,
        Caption = model.Caption,
        FeedStyle = model.FeedStyle,
        AlbumId = model.AlbumId,
      };


      if (model.Medias != null && model.Medias.Any())
      {
        var medias = model.Medias.Select(x =>
        {
          var entity = _mapper.Map<MediaEntity>(x);
          entity.CreatorId = Id;
          entity.AlbumId = model.AlbumId;
          entity.CreateAt = DateTime.Now;
          return entity;
        });
        newEntity.Medias = medias.ToList();
      }

      var dto = _mapper.Map<FeedDto>(_feedRepo.Insert(newEntity));
      dto.Owned = true;
      return dto;
    }

    public void DeleteFeed(long? feedId)
    {
      var feed = _feedRepo.Find(feedId)
        ?? throw new Exception("Feed does not exist.");

      if (feed.CreatorId != Id)
        throw new Exception("You do not have permissions to delete this feed.");

      _feedRepo.Delete(feed);
    }

    public IEnumerable<FeedDto> GetFeeds(string? username)
    {
      var feeds = _feedRepo
          .GetQueryableNoTracking()
          .OrderByDescending(feed => feed.CreateAt)
          .Where(feed => !string.IsNullOrEmpty(username) ? feed.Creator.UserName == username : true)
          .Include(feed => feed.Medias)
          .Include(feed => feed.Creator)
          .Include(feed => feed.Comments)
          .Include(x =>
              x.Comments
              .Where(comment => !comment.ParentId.HasValue)
              .OrderByDescending(comment => comment.LikeCount)
              .ThenByDescending(comment => comment.ReplyCount)
              .Take(1))
          .ThenInclude(x => x.Creator);

      return feeds.ToList().Select(feed =>
      {
        var model = _mapper.Map<FeedDto>(feed);
        model.Owned = feed.CreatorId == Id;
        var commentDto = model
        .MostRelativeComments
        .FirstOrDefault();

        if (commentDto != null)
        {
          var commentCreator = commentDto.Creator;
          commentDto.Owned = commentCreator.Id == Id;
        }

        return model;
      });
    }
    public FeedDto UpdateFeed(long feedId, RequestUpdateFeed model)
    {
      var feed = _feedRepo
        .GetQueryable()
        .Include(feed => feed.Medias)
        .FirstOrDefault(x => x.Id == feedId)
        ?? throw new Exception("Feed does not exist.");

      if (feed.CreatorId != Id)
        throw new Exception("You do not have permissions to update this feed.");

      feed.Caption = model.Caption;
      feed.FeedStyle = model.FeedStyle;

      var removedMedias = feed.Medias
         .Where(x => !model.Medias.Any(mMedia => mMedia.Id == x.Id));
      _mediaRepo.DeleteRange(removedMedias.ToArray());

      foreach (var media in model.Medias)
      {
        if (!feed.Medias.Any(x => x.Id == media.Id))
        {
          var newEntity = _mapper.Map<MediaEntity>(media);
          newEntity.CreatorId = Id;
          // newEntity.AlbumId = model.AlbumId;
          newEntity.CreateAt = DateTime.Now;
          feed.Medias.Add(newEntity);
        }
      }

      var dto = _mapper.Map<FeedDto>(_feedRepo.Update(feedId, feed));
      dto.Owned = true;
      return dto;
    }
  }
}
