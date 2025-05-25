using social_v2_api.Services.SessionService.Dtos;

namespace social_v2_api.Services.SessionService
{
  public interface ISessionService
  {
    Task<ResponseLogin> Login(RequestLoginDto model);

    ResponseCurrentSession GetCurrentSession();

    Task<ResponseLogin> LoginViaGoogle(RequestGoogleLoginDto model);

    Task<bool> LogOut();
  }
}
