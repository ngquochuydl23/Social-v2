using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using social_v2_api.Helpers;
using social_v2_api.Services.SessionService;
using social_v2_api.Services.SessionService.Dtos;


namespace social_v2_api.Controllers
{
  public class SessionController : BaseController
  {
    private readonly ISessionService _sessionService;
    public SessionController(
      IOptions<AppSettings> appSettings,
      ISessionService sessionService
    ) : base(appSettings)
    {
      _sessionService = sessionService;
    }

    [AllowAnonymous]
    [HttpPost(nameof(Login))]
    public async Task<IActionResult> Login([FromBody] RequestLoginDto model)
    {
      return Ok(await _sessionService.Login(model));
    }
    
    [HttpGet(nameof(GetCurrentSession))]
    public IActionResult GetCurrentSession()
    {
      return Ok(_sessionService.GetCurrentSession());
    }

    [HttpPost(nameof(LogOut))]
    public async Task<IActionResult> LogOut()
    {
      return Ok(await _sessionService.LogOut());
    }

    [AllowAnonymous]
    [HttpPost("External/Google")]
    public async Task<IActionResult> LoginViaGoogle([FromBody] RequestGoogleLoginDto model)
    {
      return Ok(await _sessionService.LoginViaGoogle(model));
    }

    [HttpGet("External/LoginViaFacebook")]
    public async Task<IActionResult> LoginViaFacebook([FromBody] RequestGoogleLoginDto model)
    {
      var session = _sessionService.LoginViaGoogle(model);
      return Ok(session);
    }
  }
}
