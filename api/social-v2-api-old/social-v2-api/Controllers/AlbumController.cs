using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using social_v2_api.Helpers;
using social_v2_api.Services.AlbumService;

namespace social_v2_api.Controllers
{
  public class AlbumController : BaseController
  {
    private readonly IAlbumService _albumService;
    public AlbumController(
      IOptions<AppSettings> appSettings,
      IAlbumService albumService
      ) : base(appSettings)
    {
      _albumService = albumService;
    }

    [HttpGet]
    public IActionResult GetAllAlbums([FromQuery] string? username)
    {
      return Ok(_albumService.GetAll(username));
    }

    [HttpGet("{id}")]
    public IActionResult GetAllAlbums(long id)
    {
      return Ok(_albumService.GetAlbumDetail(id));
    }
  }
}
