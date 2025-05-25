using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using social_v2_api.Entities;
using social_v2_api.Repositories.EfRepository;
using social_v2_api.Services.FollowService.FollowerDtos;
using social_v2_api.Services.FollowService.FollowingDtos;

namespace social_v2_api.Services.FollowService
{
  public class FollowService : BaseService, IFollowService
  {

    private readonly IEfRepository<FollowEntity> _followRepo;
    private readonly IEfRepository<UserEntity> _userRepo;
    private readonly IMapper _mapper;
    public FollowService(
      IEfRepository<FollowEntity> followRepo,
      IEfRepository<UserEntity> userRepo,
      IMapper mapper,
      IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
    {
      _mapper = mapper;
      _followRepo = followRepo;
      _userRepo = userRepo;
    }
    public bool CheckHasFollowed(long createId, long desId)
    {
      var entity = _followRepo
        .GetQueryableNoTracking()
        .FirstOrDefault(follow => follow.CreatorUserId == createId && follow.DestUserId == desId);
      return entity != null;
    }

    public bool CheckHasFollowed(long desId)
    {
      return CheckHasFollowed(Id, desId);
    }

    public void CreateFollowing(long userId)
    {
      if (userId == Id)
        throw new Exception("Cannot follow yourself.");

      var destAccount = _userRepo.Find(userId)
        ?? throw new Exception("Destination user does not exits.");

      if (CheckHasFollowed(userId))
        throw new Exception("You have already followed their.");

      _followRepo.Insert(new FollowEntity()
      {
        CreatorUserId = Id,
        DestUserId = userId,
        DestUser = destAccount
      });

      UpdateFollowingCount(userId);
    }

    public void UpdateFollowingCount(long destUserId)
    {
      var currentUser = _userRepo.GetQueryable()
          .Include(user => user.Followers)
          .Include(user => user.Followings)
          .FirstOrDefault(user => user.Id == Id);

      currentUser.FollowerCount = currentUser.Followers.Count;
      currentUser.FollowingCount = currentUser.Followings.Count;

      _userRepo.Update(currentUser.Id, currentUser);

      var destUser = _userRepo.GetQueryable()
          .Include(acc => acc.Followers)
          .Include(acc => acc.Followings)
          .FirstOrDefault(acc => acc.Id == destUserId);

      destUser.FollowerCount = destUser.Followers.Count;
      destUser.FollowingCount = destUser.Followings.Count;

      _userRepo.Update(destUser.Id, destUser);
    }

    public void DeleteFollower(long creatorId)
    {
      throw new NotImplementedException();
    }

    public void DeleteFollowing(long destId)
    {
      var destAccount = _userRepo.Find(destId)
        ?? throw new Exception("User does not exist.");

      if (!CheckHasFollowed(destId))
        throw new Exception("You have not followed their.");

      var entity = _followRepo
        .GetQueryableNoTracking()
        .FirstOrDefault(x => x.CreatorUserId == Id && x.DestUserId == destId);
      _followRepo.Delete(entity.Id);

      UpdateFollowingCount(destId);
    }

    public IEnumerable<FollowerDto> GetFollowers(string? username)
    {
      var followings = _followRepo
          .GetQueryable()
          .Where(x => !string.IsNullOrEmpty(username) ? x.DestUser.UserName == username : x.DestUserId == Id)
          .Include(x => x.DestUser)
          .Include(x => x.CreatorUser)
          .ToList();

      return followings.Select(x =>
      {
        var model = _mapper.Map<FollowerDto>(x);
        model.Owned = x.DestUserId == Id;
        return model;
      });
    }

    public IEnumerable<FollowingDto> GetFollowings(string? username)
    {
      var followings = _followRepo
          .GetQueryable()
          .Where(x => !string.IsNullOrEmpty(username) ? x.CreatorUser.UserName == username : x.CreatorUserId == Id)
          .Include(x => x.CreatorUser)
          .Include(x => x.DestUser)
          .ThenInclude(x => x.Followers)
          .ToList();

      return followings.Select(x =>
      {
        var model = _mapper.Map<FollowingDto>(x);
        model.Owned = x.CreatorUserId == Id;
        model.Followed = x
          .DestUser
          .Followers
          .FirstOrDefault(follower => follower.CreatorUserId == Id) != null;
        return model;
      });
    }
  }
}
