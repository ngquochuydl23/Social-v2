using System.ComponentModel.DataAnnotations;

namespace social_v2_api.Services.SessionService.Dtos
{
  public class RequestLoginDto: BaseRequestLoginDto
  {
    [Required]
    public string UserName { get; set; }

    [Required]
    public string Password { get; set; }
  }
}
