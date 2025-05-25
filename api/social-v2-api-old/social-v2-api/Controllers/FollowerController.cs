using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using social_v2_api.Helpers;
using social_v2_api.Services.FollowService;


namespace social_v2_api.Controllers
{
  public class FollowerController : BaseController
  {

    private readonly IFollowService _followService;

    public FollowerController(
      IOptions<AppSettings> appSettings,
      IFollowService followService,
      IMapper mapper) : base(appSettings)
    {
      _followService = followService;
    }

    [HttpGet]
    public IActionResult GetAll([FromQuery] string? username)
    {
      return Ok(_followService.GetFollowers(username));
    }

    [HttpDelete(nameof(Delete))]
    public IActionResult Delete([FromQuery] int UserId)
    {
      _followService.DeleteFollower(UserId);
      return base.Ok();
    }
  }
}
