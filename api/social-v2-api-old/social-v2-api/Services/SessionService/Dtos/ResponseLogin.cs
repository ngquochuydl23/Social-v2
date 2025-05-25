using Microsoft.Extensions.Options;
using social_v2_api.Entities;
using social_v2_api.Helpers;
using social_v2_api.Services.ProfileService.ProfileDtos;
using social_v2_api.Utils.JwtUtils;

namespace social_v2_api.Services.SessionService.Dtos
{
  public class ResponseLogin
  {
    public long? UserId { get; set; }
    public string? Token { get; set; }

    public long? DeviceId { get; set; }

    public ResponseLogin(AppSettings appSettings, UserEntity? enity, long deviceId)
    {
      UserId = enity!.Id;
      DeviceId = deviceId;
      Token = new JwtUtils(appSettings).GenerateToken(enity, deviceId);
    }
  }
}
