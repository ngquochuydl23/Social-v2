using System.ComponentModel.DataAnnotations;

namespace social_v2_api.Services.SessionService.Dtos
{
  public class RequestGoogleLoginDto: BaseRequestLoginDto
  {
    [Required]
    public string AccessToken { get; set; }
  }
}
