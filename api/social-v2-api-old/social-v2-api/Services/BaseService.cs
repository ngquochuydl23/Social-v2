using Google.Apis.Auth;
using Microsoft.Extensions.Options;
using social_v2_api.Entities;
using social_v2_api.Helpers;

namespace social_v2_api.Services
{
  public class BaseService
  {

    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IOptions<GoogleAuthSettings> _googleAuthSettings;
    public BaseService(IHttpContextAccessor httpContextAccessor)
    {
      _httpContextAccessor = httpContextAccessor;
    }

    public BaseService(IHttpContextAccessor httpContextAccessor, IOptions<GoogleAuthSettings> googleAuthSettings)
    {
      _httpContextAccessor = httpContextAccessor;
      _googleAuthSettings = googleAuthSettings;
    }

    public IHeaderDictionary Header
    {
      get =>  _httpContextAccessor.HttpContext.Request.Headers;
    }

    public long Id
    {
      get => long.Parse(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == "id").Value);
    }

    public DeviceEntity CurrentDevice
    {
      get => (DeviceEntity) _httpContextAccessor.HttpContext.Items["Device"];
    }

    public async Task<GoogleJsonWebSignature.Payload> GetPayloadFromGoogleAuth(string credential)
    {
      return await GoogleJsonWebSignature.ValidateAsync(credential);
    }
  }
}
