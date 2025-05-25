using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using social_v2_api.Helpers;
using social_v2_api.Services.StoryService;
using social_v2_api.Services.StoryService.Dtos;


namespace social_v2_api.Controllers
{
  public class StoryController : BaseController
  {

    private readonly IStoryService _storyService;
    public StoryController(
      IOptions<AppSettings> appSettings,
      IStoryService storyService,
      IMapper mapper) : base(appSettings)
    {
      _storyService = storyService;
    }


    [HttpGet("{id}")]
    public IActionResult GetAllStoredStories(int id)
    {
      try
      {
        return Ok(_storyService.GetAllStoredStories());
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpPost]
    public IActionResult CreateStory([FromBody] CreateStoryDto model)
    {
      try
      {
        return Ok(_storyService.CreateStory(model));
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpPost("Watch/{id}")]
    public IActionResult WatchStory(int id)
    {
      try
      {
        return Ok(_storyService.WatchStory(id));
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }


    [HttpGet("{id}/Viewers")]
    public IActionResult GetViewers(int id)
    {
      try
      {
        return Ok(_storyService.GetViewers(id));
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpGet("InDay")]
    public IActionResult GetStoriesInDay()
    {
      try
      {
        return Ok(_storyService.GetStoriesInDay());
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteStory(long id)
    {
      try
      {
        return Ok(_storyService.DeleteStory(id));
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }
  }
}
