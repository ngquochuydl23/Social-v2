using Google.Apis.Auth;
using social_v2_api.Entities;
using social_v2_api.Services.ProfileService.ProfileDtos;
using social_v2_api.Services.RegisterService.Dtos;
using social_v2_api.Services.SessionService.Dtos;

namespace social_v2_api.Services.UserService
{
  public interface IRegisterService
  {
    ProfileDto SignUp(RequestRegister model);

    Task<ResponseLogin> SignUpViaGoogle(string credential, RequestRegister model);
  }
}
