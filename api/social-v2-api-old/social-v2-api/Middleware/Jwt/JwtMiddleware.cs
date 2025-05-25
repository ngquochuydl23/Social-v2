using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using social_v2_api.Entities;
using social_v2_api.Helpers;
using social_v2_api.Models;
using social_v2_api.Repositories.EfRepository;
using social_v2_api.Services.DeviceService.Dtos;
using social_v2_api.Utils.JwtUtils;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Text;

namespace social_v2_api.Middleware.Jwt
{
  public class JwtMiddleware
  {
    private readonly RequestDelegate _next;
    private readonly AppSettings _appSettings;
    public JwtMiddleware(
      RequestDelegate next,
      IOptions<AppSettings> appSettings)
    {
      _next = next;
      _appSettings = appSettings.Value;
    }

    public async Task Invoke(
      HttpContext context,
      IEfRepository<UserEntity> userRepo,
      IEfRepository<DeviceEntity> deviceRepo)
    {
      try
      {
        var token = context
          .Request
          .Headers["Authorization"]
          .FirstOrDefault()
          ?.Split(" ")
          .Last();

        var endpoint = context.GetEndpoint();
        var isAllowAnonymous = endpoint
          ?.Metadata
          .Any(x => x.GetType() == typeof(AllowAnonymousAttribute)) ?? false;

        if (!isAllowAnonymous)
        {
          if (string.IsNullOrEmpty(token))
            throw new Exception("Unauthorized");

          var tokenHandler = new JwtSecurityTokenHandler();
          SecurityToken? jwtSecurityToken = tokenHandler.ReadJwtToken(token);
          var jwtPayload = new JwtUtils(_appSettings)
            .DecodeToken((JwtSecurityToken)jwtSecurityToken);
          try
          {
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
              ValidateIssuerSigningKey = true,
              IssuerSigningKey = new SymmetricSecurityKey(key),
              ValidateIssuer = false,
              ValidateAudience = false,
              ClockSkew = TimeSpan.Zero
            }, out jwtSecurityToken);
          }
          catch
          {
            if (deviceRepo.Find(jwtPayload.DeviceId) != null)
              deviceRepo.Delete(jwtPayload.DeviceId);
            throw new Exception("Your token is expired.");
          }

          var user = userRepo.Find(jwtPayload.Id)
           ?? throw new Exception("User does not exist.");

          var device = deviceRepo.Find(jwtPayload.DeviceId)
            ?? throw new Exception("This device is terminated.");

          context.Items["User"] = user;
          context.Items["Device"] = device;
          await _next(context);
        }
        else
        {
          await _next(context);
        }
      }
      catch (Exception ex)
      {
        context.Response.StatusCode = StatusCodes.Status400BadRequest;
        context.Response.WriteAsJsonAsync(new HttpErrorDto(ex.Message, StatusCodes.Status400BadRequest));
      }
    }
  }
}
