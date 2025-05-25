using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Options;
using social_v2_api.Helpers;
using social_v2_api.Models;

namespace social_v2_api.Controllers
{
  [AuthorizeAttribute]
  [Route("api/[controller]")]
  [ApiController]
  public abstract class BaseController : ControllerBase
  {

    protected readonly AppSettings _appSettings;

    public BaseController(IOptions<AppSettings> appSettings)
    {
      _appSettings = appSettings.Value;
    }

    public override OkObjectResult Ok([ActionResultObjectValue] object value)
    {
      return base.Ok(new HttpResultDto(value, StatusCodes.Status200OK));
    }

    public override NotFoundObjectResult NotFound([ActionResultObjectValue] object? value)
    {
      return base.NotFound(value);
    }
    public override BadRequestObjectResult BadRequest([ActionResultObjectValue] object error)
    {
      return base.BadRequest(new HttpErrorDto(error, StatusCodes.Status400BadRequest));
    }

    public int Id
    {
      get => int.Parse(User.Claims.First(x => x.Type == "id").Value);
    }

    public string UserName
    {
      get => User.Claims.First(x => x.Type == "username").Value;
    }
  }
}
