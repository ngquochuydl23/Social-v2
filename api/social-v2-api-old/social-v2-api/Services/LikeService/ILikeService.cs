using social_v2_api.Services.LikeService.Dtos;

namespace social_v2_api.Services.LikeService
{
  public interface ILikeService
  {
    LikeDto CreateFeedLike(long? feedId);

    IEnumerable<LikeDto> GetFeedLikes(long? feedId);

    void DeleteFeedLike(long? feedId);
  }
}
