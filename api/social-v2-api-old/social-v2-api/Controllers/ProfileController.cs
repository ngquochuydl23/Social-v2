using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using social_v2_api.Helpers;
using social_v2_api.Models;
using social_v2_api.Services.ProfileService;
using social_v2_api.Services.UserService;

namespace social_v2_api.Controllers
{
  public class ProfileController : BaseController
  {
    private readonly IProfileService _profileService;
    public ProfileController(
      IOptions<AppSettings> appSettings,
      IProfileService profileService,
      IMapper mapper) : base(appSettings)
    {
      _profileService = profileService;
    }

    [HttpGet]
    public IActionResult GetProfile([FromQuery] string? username)
    {
      return Ok(_profileService.GetProfileByUserName(username ?? UserName));
    }

    [HttpGet("Albums")]
    public IActionResult GetAlbum([FromQuery] string? username)
    {
      return Ok(_profileService.GetAlbums(username ?? UserName));
    }

    [HttpGet("Images")]
    public IActionResult GetImages([FromQuery] string? username)
    {
      return Ok(_profileService.GetImages(username ?? UserName));
    }

    [HttpGet("Introduction")]
    public IActionResult GetIntroduction([FromQuery] string? username)
    {
      return Ok();
    }
  }
}
