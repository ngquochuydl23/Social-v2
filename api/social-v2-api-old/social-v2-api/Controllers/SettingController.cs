using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using social_v2_api.Helpers;
using social_v2_api.Services.SettingService;
using social_v2_api.Services.SettingService.ManageAccountDtos;
using social_v2_api.Services.SettingService.SecurityAndPrivacyDtos;

namespace social_v2_api.Controllers
{
  public class SettingController : BaseController
  {
    private readonly ISettingService _settingService;
    public SettingController(
      IOptions<AppSettings> appSettings,
      ISettingService settingService,
      IMapper mapper) : base(appSettings)
    {
      _settingService = settingService;
    }

    [HttpPatch("ManageAccount/ChangeAvatar")]
    public IActionResult ChangeAvatar(RequestChangeAvatar model)
    {
      try
      {
        var setting = _settingService.ChangeAvatar(model);
        return Ok(setting);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpPatch("ManageAccount/ChangeCover")]
    public IActionResult ChangeCover(RequestChangeCover model)
    {
      try
      {
        var setting = _settingService.ChangeCover(model);
        return Ok(setting);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpPatch("ManageAccount/ChangeBio")]
    public IActionResult ChangeBio(RequestChangeBio model)
    {
      try
      {
        var setting = _settingService.ChangeBio(model);
        return Ok(setting);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpGet("SecurityAndPrivacy")]
    public IActionResult GetSecurityAndPrivacy()
    {
      try
      {
        var setting = _settingService.GetSecurityAndPrivacy();
        return Ok(setting);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpPatch("Security/ChangeEmail")]
    public IActionResult ChangeEmail(RequestChangeEmail model)
    {
      try
      {
        var setting = _settingService.ChangeEmail(model);
        return Ok(setting);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpPost("Security/VerifyEmail")]
    public IActionResult VerifyEmail()
    {
      return Ok();
    }

    [HttpPatch("Security/ChangePhoneNumber")]
    public IActionResult ChangePhoneNumber(RequestChangePhoneNumber model)
    {
      try
      {
        var setting = _settingService.ChangePhoneNumber(model);
        return Ok(setting);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpPost("Security/VerifyPhoneNumber")]
    public IActionResult VerifyPhoneNumber()
    {
      return Ok();
    }

    [HttpPut("Security/ChangePassword")]
    public IActionResult ChangePassword(RequestChangePassword model)
    {
      try
      {
        var setting = _settingService.ChangePassword(model);
        return Ok(setting);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpPut("Security/SetupTwoFactorAuthentication")]
    public IActionResult SetupTwoFactorAuthentication()
    {
      return Ok();
    }
  }
}
