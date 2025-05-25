using AutoMapper;
using Google.Apis.Auth;
using Microsoft.Extensions.Options;
using social_v2_api.Entities;
using social_v2_api.Helpers;
using social_v2_api.Repositories.EfRepository;
using social_v2_api.Services.ProfileService.ProfileDtos;
using social_v2_api.Services.RegisterService.Dtos;
using social_v2_api.Services.SessionService.Dtos;
using social_v2_api.Services.UserService;

namespace social_v2_api.Services.RegisterService
{
    public class RegisterService : BaseService, IRegisterService
  {
    private readonly IEfRepository<AlbumEntity> _albumRepo;
    private readonly IEfRepository<UserEntity> _userRepo;
    private readonly IMapper _mapper;
    public RegisterService(
      IOptions<GoogleAuthSettings> googleAuthSettings,
      IEfRepository<UserEntity> userRepo,
      IEfRepository<AlbumEntity> albumRepo,
      IMapper mapper,
      IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor, googleAuthSettings)
    {
      _mapper = mapper;
      _userRepo = userRepo;
      _albumRepo = albumRepo;
    }
    public ProfileDto SignUp(RequestRegister model)
    {
      var signUpEntity = _mapper.Map<UserEntity>(model);
      signUpEntity.Password = BCrypt.Net.BCrypt.HashPassword(signUpEntity.Password);
      var newUser = _userRepo.Insert(_mapper.Map<UserEntity>(signUpEntity));

      InitiateNewUser(newUser);
      return _mapper.Map<ProfileDto>(newUser);
    }

    public async Task<ResponseLogin> SignUpViaGoogle(string credential, RequestRegister model)
    {
      throw new NotImplementedException();
    }

    private void InitiateNewUser(UserEntity entity)
    {
      _albumRepo.Insert(new AlbumEntity
      {
        Name = "Avatar",
        CreatorId = entity.Id,
        Removable = false,
        CreateAt = DateTime.Now,
      });

      _albumRepo.Insert(new AlbumEntity
      {
        Name = "Cover",
        CreatorId = entity.Id,
        Removable = false,
        CreateAt = DateTime.Now,
      });
    }
  }
}
