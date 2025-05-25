using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using social_v2_api.Helpers;
using social_v2_api.Services.FollowService;
using social_v2_api.Services.FollowService.FollowingDtos;

namespace social_v2_api.Controllers
{
  public class FollowingController : BaseController
  {

    private readonly IFollowService _followService;
    public FollowingController(
      IOptions<AppSettings> appSettings,
      IFollowService followService,
      IMapper mapper) : base(appSettings)
    {
      _followService = followService;
    }

    [HttpPost("{userId}")]
    public IActionResult Create(long userId)
    {
      try
      {
        _followService.CreateFollowing(userId);
        return Ok("Created following successfully.");
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpDelete("{userId}")]
    public IActionResult Delete(long userId)
    {
      try
      {
        _followService.DeleteFollowing(userId);
        return Ok("Delete following successfully.");
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpGet]
    public IActionResult GetAll([FromQuery] string? username)
    {
      try
      {
        return Ok(_followService.GetFollowings(username));
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }
  }
}
