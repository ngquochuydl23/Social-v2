using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using social_v2_api.Helpers;
using social_v2_api.Services.SearchService;
using social_v2_api.Services.UserService;

namespace social_v2_api.Controllers
{
  public class SearchController : BaseController
  {

    private readonly ISearchService _searchService;
    public SearchController(
      IOptions<AppSettings> appSettings,
      ISearchService searchService,
      IMapper mapper) : base(appSettings)
    {
      _searchService = searchService;
    }

    [HttpGet]
    public IActionResult Search([FromQuery] string? keyword)
    {
      return Ok();
    }

    [HttpGet("History")]
    public IActionResult GetHistory()
    {
      return Ok(_searchService.GetSearchHistory());
    }

    [HttpGet("Users")]
    public IActionResult SearchUsers([FromQuery] string? keyword)
    {
      return Ok();
    }

    [HttpGet("Feeds")]
    public IActionResult SearchFeeds([FromQuery] string? keyword)
    {
      return Ok();
    }
  }
}
