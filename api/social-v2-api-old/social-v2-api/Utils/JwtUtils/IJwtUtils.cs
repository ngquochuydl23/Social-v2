using social_v2_api.Entities;
using social_v2_api.Middleware.Jwt;
using social_v2_api.Services.ProfileService.ProfileDtos;
using System.IdentityModel.Tokens.Jwt;

namespace social_v2_api.Utils.JwtUtils
{
  public interface IJwtUtils
  {
    public string GenerateToken(UserEntity user, long deviceId);
    public JWTPayload DecodeToken(JwtSecurityToken validatedToken);
  }
}
