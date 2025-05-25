using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using social_v2_api.Entities;
using social_v2_api.Helpers;
using social_v2_api.Repositories.EfRepository;
using social_v2_api.Services.CommentService.Dtos;
using social_v2_api.Services.FeedService.Dtos;
using social_v2_api.Services.LikeService.Dtos;
using System.Xml.Linq;

namespace social_v2_api.Services.LikeService
{
  public class LikeService : BaseService, ILikeService
  {
    private readonly IEfRepository<FeedEntity> _feedRepo;
    private readonly IEfRepository<LikeEntity> _likeRepo;
    private readonly IMapper _mapper;
    public LikeService(
      IEfRepository<LikeEntity> likeRepo,
      IEfRepository<FeedEntity> feedRepo,
      IMapper mapper,
      IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
    {
      _mapper = mapper;
      _likeRepo = likeRepo;
      _feedRepo = feedRepo;
    }

    public LikeDto CreateFeedLike(long? feedId)
    {
      if (feedId == null)
        throw new NullReferenceException(nameof(feedId));

      var likeEntity = _likeRepo
        .GetQueryableNoTracking()
        .FirstOrDefault(x => x.FeedId == feedId && x.CreatorId == Id);

      if (likeEntity != null)
        throw new Exception("Like is already created.");

      likeEntity = _likeRepo.Insert(new LikeEntity()
      {
        FeedId = feedId,
        CreatorId = Id,
      });
      UpdateFeedLikeCount(feedId.Value);
      var dto = _mapper.Map<LikeDto>(likeEntity);
      dto.Owned = true;
      return dto;
    }

    public void DeleteFeedLike(long? feedId)
    {
      if (feedId == null)
        throw new NullReferenceException(nameof(feedId));

      var likeEntity = _likeRepo
        .GetQueryableNoTracking()
        .FirstOrDefault(x => x.FeedId == feedId && x.CreatorId == Id);

      if (likeEntity == null)
        throw new Exception("Like does not exist.");
      _likeRepo.Delete(likeEntity);
      UpdateFeedLikeCount(feedId.Value);
    }

    public IEnumerable<LikeDto> GetFeedLikes(long? feedId)
    {
      if (feedId == null)
        throw new NullReferenceException(nameof(feedId));

      var likes = _likeRepo
        .GetQueryableNoTracking()
        .Include(x => x.Creator)
        .ThenInclude(x => x.Followers)
        .Where(x => x.FeedId == feedId)
        .ToList();

      return likes.Select(like =>
      {
        var dto = _mapper.Map<LikeDto>(like);
        var creator = like.Creator;
        if (creator.Id != Id)
        {
          dto.Creator.Followed = creator
            .Followers
            .FirstOrDefault(x => x.CreatorUserId == Id) != null;

          dto.Owned = false;
        } else
        {
          dto.Creator.Followed = null;
          dto.Owned = true;
        }
        return dto;
      });
    }
    private void UpdateFeedLikeCount(long feedId)
    {
      var feed = _feedRepo.Find(feedId);
      var count = _likeRepo
        .GetQueryableNoTracking()
        .Where(x => x.FeedId == feed.Id)
        .Count();

      feed.LikeCount = count;
      _feedRepo.Update(feedId, feed);
    }
  }
}

