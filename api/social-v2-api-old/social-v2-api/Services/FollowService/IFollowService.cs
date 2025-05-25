using social_v2_api.Services.FollowService.FollowerDtos;
using social_v2_api.Services.FollowService.FollowingDtos;

namespace social_v2_api.Services.FollowService
{
  public interface IFollowService
  {
    void CreateFollowing(long userId);

    IEnumerable<FollowingDto> GetFollowings(string? username);

    IEnumerable<FollowerDto> GetFollowers(string? username);

    void DeleteFollowing(long destId);

    void DeleteFollower(long creatorId);

    bool CheckHasFollowed(long createId, long desId);

    bool CheckHasFollowed(long desId);
  }
}
