using social_v2_api.Entities;
using social_v2_api.Services.FeedService.Dtos;

namespace social_v2_api.Services.FeedService
{
  public interface IFeedService
  {
    FeedDto CreateFeed(RequestCreateFeed model);

    FeedDto UpdateFeed(long feedId ,RequestUpdateFeed model);

    IEnumerable<FeedDto> GetFeeds(string? username);

    void DeleteFeed(long? feedId);
  }
}
