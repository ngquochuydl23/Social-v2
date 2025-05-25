using System.ComponentModel.DataAnnotations;

namespace social_v2_api.Services.SessionService.Dtos
{
  public class BaseRequestLoginDto
  {
    [Required]
    public string AppName { get; set; }
    [Required]
    public string AppVersion { get; set; }
    [Required]
    public string DeviceName { get; set; }
    [Required]
    public string Platform { get; set; }
  }
}
