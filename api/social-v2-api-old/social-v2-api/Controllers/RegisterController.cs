using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using social_v2_api.Helpers;
using social_v2_api.Services.RegisterService.Dtos;
using social_v2_api.Services.UserService;

namespace social_v2_api.Controllers
{
  public class RegisterController : BaseController
  {
    private readonly IRegisterService _registerService;
    public RegisterController(
      IOptions<AppSettings> appSettings,
      IRegisterService registerService,
      IMapper mapper) : base(appSettings)
    {
      _registerService = registerService;
    }

    [AllowAnonymous]
    [HttpPost(nameof(SignUp))]
    public IActionResult SignUp([FromBody] RequestRegister model)
    {
      try
      {
        var newUser = _registerService.SignUp(model);
        return Ok(newUser);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }
  }
}
