using social_v2_api.BaseDtos;

namespace social_v2_api.Services.DeviceService.Dtos
{
  public class DeviceDto: BaseDto
  {
    public string DeviceName { get; set; }  

    public string Platform { get; set; }

    public DateTime CreateAt { get; set; }

    public bool TurnOffNotification { get; set; }

    public string AppName { get; set; }

    public string AppVersion { get; set; }

    public DateTime LastAccess { get; set; }

    public string IpAddress { get; set; }

    public string Location { get; set; }
  }
}
