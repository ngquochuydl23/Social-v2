using AutoMapper;
using Microsoft.Extensions.Options;
using social_v2_api.Entities;
using social_v2_api.Helpers;
using social_v2_api.Repositories.EfRepository;

namespace social_v2_api.Services.UserService
{
    public class UserService : BaseService, IUserService
  {
    private readonly IEfRepository<UserEntity> _userRepo;
    private readonly IMapper _mapper;
    public UserService(
      IEfRepository<UserEntity> userRepo,
      IMapper mapper,
      IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
    {
      _mapper = mapper;
      _userRepo = userRepo;
    }

    public bool CheckExistsUsername(string? userName)
    {
      if (string.IsNullOrEmpty(userName))
        throw new Exception("Username must not be null or empty.");

      return _userRepo
        .GetQueryableNoTracking()
        .FirstOrDefault(x => x.UserName == userName) != null;
    }

    public UserEntity GetEntityById(long? id) => _userRepo.Find(id);
  }
}
