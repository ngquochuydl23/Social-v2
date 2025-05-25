using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using social_v2_api.Helpers;
using social_v2_api.Services.CommentService;
using social_v2_api.Services.CommentService.Dtos;
using social_v2_api.Services.SessionService;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace social_v2_api.Controllers
{
  public class CommentController : BaseController
  {
    private readonly ICommentService _commentService;
    public CommentController(
      IOptions<AppSettings> appSettings,
      ICommentService commentService ) : base(appSettings)
    {
      _commentService = commentService;
    }

    [HttpGet("{id}")]
    public IActionResult GetCommentByFeedId(long id)
    {
      try
      {
        var setting = _commentService.GetCommentsByFeedId(id);
        return Ok(setting);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpPost("{id}")]
    public IActionResult CreateComment(long id, [FromQuery] long? parentId, [FromBody] CreateUpdateComment model)
    {
      try
      {
        var data = _commentService.CreateComment(id, parentId, model);
        return Ok(data);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpPut("{id}")]
    public IActionResult UpdateComment(long id, [FromBody] CreateUpdateComment model)
    {
      try
      {
        var data = _commentService.UpdateComment(id, model);
        return Ok(data);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpDelete("{id}")]
    public void Delete(int id)
    {
      
    }
  }
}
