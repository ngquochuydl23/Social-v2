using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace social_v2_api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ReelController : ControllerBase
  {
    // GET: api/<ReelController>
    [HttpGet(nameof(GetHashtags))]
    public IEnumerable<string> GetHashtags()
    {
      return new string[] { "value1", "value2" };
    }

    [HttpGet(nameof(GetAll))]
    public string GetAll(int id)
    {
      return "value";
    }

    [HttpPost(nameof(Create))]
    public void Create([FromBody] string value)
    {
    }

    // PUT api/<ReelController>/5
    [HttpPut("{id}")]
    public void EditReel(int id, [FromBody] string value)
    {
    }

    // DELETE api/<ReelController>/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
