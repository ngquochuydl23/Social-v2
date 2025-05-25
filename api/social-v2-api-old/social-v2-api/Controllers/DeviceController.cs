using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using social_v2_api.Helpers;
using social_v2_api.Models;
using social_v2_api.Services.DeviceService;
using social_v2_api.Services.DeviceService.Dtos;

namespace social_v2_api.Controllers
{
  public class DeviceController : BaseController
  {
    private readonly IDeviceService _deviceService;

    public DeviceController(
      IOptions<AppSettings> appSettings,
      IDeviceService deviceService
    ) : base(appSettings)
    {
      _deviceService = deviceService;
    }

    [HttpGet]
    public IActionResult GetAllDevices()
    {
      return Ok(_deviceService.GetAllDevices());
    }

    [HttpPut("SetUpNofication")]
    public IActionResult SetUpNofication([FromBody] RequestSetupNotification model)
    {
      return Ok(_deviceService.SetupNotification(model));
    }

    [HttpPatch("TurnOnOffNotification")]
    public IActionResult TurnOnOffNotification([FromQuery] long? deviceId, [FromBody] RequestTurnOnOffNotification model)
    {
      return Ok(_deviceService.TurnOnOffNotification(deviceId, model));
    }

    [HttpDelete("TerminateDevice")]
    public IActionResult TerminateDevice([FromQuery] long? deviceId, [FromBody] RequestTurnOnOffNotification model)
    {
      return Ok(_deviceService.TerminateDeviceById(deviceId));
    }

    [HttpDelete("TerminateAllDevices")]
    public IActionResult TerminateAllDevices()
    {
      return Ok(_deviceService.TerminateAllDevices());
    }
  }
}
