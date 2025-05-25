using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using social_v2_api.Helpers;
using social_v2_api.Services.FollowService;
using social_v2_api.Services.LikeService;


namespace social_v2_api.Controllers
{
  public class LikeController : BaseController
  {
    private readonly ILikeService _likeService;

    public LikeController(IOptions<AppSettings> appSettings, ILikeService likeService) : base(appSettings)
    {
      _likeService = likeService;
    }

    [HttpGet("Feed")]
    public IActionResult GetFeedLikes(long? feedId)
    {
      try
      {
        return Ok(_likeService.GetFeedLikes(feedId));
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpPost("Feed")]
    public IActionResult CreateFeedLike([FromQuery] long? feedId)
    {
      try
      {
        return Ok(_likeService.CreateFeedLike(feedId));
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpDelete("Feed")]
    public IActionResult DeleteFeedLike([FromQuery] long? feedId)
    {
      try
      {
        _likeService.DeleteFeedLike(feedId);
        return Ok("Like is successfully deleted.");
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }
  }
}
