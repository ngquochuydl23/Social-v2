using social_v2_api.Services.DeviceService.Dtos;

namespace social_v2_api.Services.DeviceService
{
  public interface IDeviceService
  {
    DeviceDto SetupNotification(RequestSetupNotification model);

    DeviceDto TurnOnOffNotification(long? deviceId, RequestTurnOnOffNotification model);

    bool TerminateDeviceById(long? deviceId);

    bool TerminateAllDevices();

    IEnumerable<DeviceDto> GetAllDevices();
  }
}
