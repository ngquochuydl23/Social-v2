using Microsoft.IdentityModel.Tokens;
using social_v2_api.Entities;
using social_v2_api.Helpers;
using social_v2_api.Middleware.Jwt;
using social_v2_api.Services.ProfileService.ProfileDtos;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace social_v2_api.Utils.JwtUtils
{
    public class JwtUtils : IJwtUtils
  {
    private readonly AppSettings _appSettings;

    public JwtUtils(AppSettings appSettings)
    {
      _appSettings = appSettings;
    }

    public JWTPayload DecodeToken(JwtSecurityToken validatedToken)
    {
      var id = long.Parse(validatedToken.Claims.First(x => x.Type == "id").Value);
      var deviceId = long.Parse(validatedToken.Claims.First(x => x.Type == "deviceId").Value);
      var username = validatedToken.Claims.First(x => x.Type == "username").Value;
      var exp = long.Parse(validatedToken.Claims.First(x => x.Type == "exp").Value);

      return new JWTPayload
      {
        Id = id,
        DeviceId = deviceId,
        Username = username,
        Exp = exp
      };
    }

    public string GenerateToken(UserEntity user, long deviceId)
    {
      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new[] {
          new Claim("id", user.Id.ToString()),
          new Claim("username", user.UserName),
          new Claim("deviceId", deviceId.ToString())
        }),
        Expires = DateTime.UtcNow.AddDays(30),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };
      var token = tokenHandler.CreateToken(tokenDescriptor);
      return tokenHandler.WriteToken(token);
    }
  }
}
