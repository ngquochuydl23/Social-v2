using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using social_v2_api.Helpers;
using social_v2_api.Services.FeedService;
using social_v2_api.Services.FeedService.Dtos;
using social_v2_api.Services.FollowService;


namespace social_v2_api.Controllers
{
  public class FeedController : BaseController
  {

    private readonly IFeedService _feedService;
    public FeedController(
      IOptions<AppSettings> appSettings,
      IFeedService feedService,
      IMapper mapper) : base(appSettings)
    {
      _feedService = feedService;
    }

    [HttpGet]
    public IActionResult GetAll([FromQuery] string? username)
    {
      return Ok(_feedService.GetFeeds(username));
    }

    [HttpPost("Create")]
    public IActionResult CreateFeed([FromBody] RequestCreateFeed model)
    {
      return Ok(_feedService.CreateFeed(model));
    }

    [HttpPut("{id}")]
    public IActionResult UpdateFeed(long id, [FromBody] RequestUpdateFeed model)
    {
      return Ok(_feedService.UpdateFeed(id, model));
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteFeed(int id)
    {
      _feedService.DeleteFeed(id);
      return Ok("Feed is successfully deleted.");
    }
  }
}
