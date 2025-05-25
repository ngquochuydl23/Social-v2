using AutoMapper;
using social_v2_api.Entities;
using social_v2_api.Repositories.EfRepository;
using social_v2_api.Services.DeviceService.Dtos;

namespace social_v2_api.Services.DeviceService
{
  public class DeviceService : BaseService, IDeviceService
  {
    private readonly IEfRepository<DeviceEntity> _deviceRepo;
    private readonly IMapper _mapper;
    public DeviceService(
      IEfRepository<DeviceEntity> deviceRepo,
      IMapper mapper,
      IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
    {
      _mapper = mapper;
      _deviceRepo = deviceRepo;
    }

    public IEnumerable<DeviceDto> GetAllDevices()
    {
      var entities = _deviceRepo
        .GetQueryableNoTracking()
        .OrderByDescending(x => x.Id == CurrentDevice.Id)
        .ThenByDescending(x => x.CreateAt)
        .Where(x => x.CreatorId == Id)
        .ToList();

      return _mapper.Map<IEnumerable<DeviceDto>>(entities);
    }

    public DeviceDto SetupNotification(RequestSetupNotification model)
    {

      CurrentDevice.DeviceToken = model.FcmToken;
      CurrentDevice.TurnOffNotification = false;
      _deviceRepo.Update(CurrentDevice.Id, CurrentDevice);

      return _mapper.Map<DeviceDto>(CurrentDevice);
    }

    public bool TerminateDeviceById(long? deviceId)
    {
      _deviceRepo.Delete(deviceId.HasValue ? deviceId.Value : CurrentDevice.Id);
      return true;
    }

    public bool TerminateAllDevices()
    {

      var entities = _deviceRepo
        .GetQueryableNoTracking()
        .Where(x => x.CreatorId == Id)
        .ToArray()
          ?? throw new Exception("These devices are terminated");

      _deviceRepo.DeleteRange(entities);
      return true;
    }

    public DeviceDto TurnOnOffNotification(long? deviceId, RequestTurnOnOffNotification model)
    {
      if (deviceId.HasValue)
      {
        var entity = _deviceRepo.Find(deviceId);
        entity.TurnOffNotification = model.TurnOff;

        _deviceRepo.Update(entity.Id, entity);
        return _mapper.Map<DeviceDto>(entity);
      }

      CurrentDevice.TurnOffNotification = model.TurnOff;
      _deviceRepo.Update(CurrentDevice.Id, CurrentDevice);

      return _mapper.Map<DeviceDto>(CurrentDevice);
    }
  }
}
