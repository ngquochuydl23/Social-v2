using AutoMapper;
using Google.Apis.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using SharpCompress.Common;
using social_v2_api.Entities;
using social_v2_api.Helpers;
using social_v2_api.Repositories.EfRepository;
using social_v2_api.Services.DeviceService.Dtos;
using social_v2_api.Services.SessionService.Dtos;
using System.Net.Http.Headers;

namespace social_v2_api.Services.SessionService
{
  public class SessionService : BaseService, ISessionService
  {
    private readonly IEfRepository<UserEntity> _userRepo;
    private readonly IEfRepository<DeviceEntity> _deviceRepo;
    private readonly IMapper _mapper;
    private readonly IOptions<AppSettings> _appSetting;
    public SessionService(
      IOptions<AppSettings> appSettings,
      IOptions<GoogleAuthSettings> googleAuthSettings,
      IEfRepository<UserEntity> userRepo,
      IEfRepository<DeviceEntity> deviceRepo,
      IMapper mapper,
      IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor, googleAuthSettings)
    {
      _appSetting = appSettings;
      _mapper = mapper;
      _userRepo = userRepo;
      _deviceRepo = deviceRepo;
    }
    public ResponseCurrentSession GetCurrentSession()
    {
      var entity = _userRepo.GetQueryableNoTracking()
        .Include(x => x.Client)
        .FirstOrDefault(x => x.Id == Id)
          ?? throw new Exception("User does not exist.");

      return new ResponseCurrentSession()
      {
        User = _mapper.Map<ResponseCurrentSession.SessionUser>(entity),
        MessageBadges = 0,
        NotiBadges = 10,
        ClientState = new ResponseCurrentSession.Client
        {
          Language = entity.Client.Language,
          IsDarkMode = entity.Client.IsDarkMode
        }
      };
    }

    public async Task<ResponseLogin> Login(RequestLoginDto model)
    {
      if (model == null)
        throw new NullReferenceException(nameof(model));

      if (string.IsNullOrEmpty(model.UserName) || string.IsNullOrEmpty(model.Password))
        throw new Exception("Username and Password must not be empty or null.");

      var user = _userRepo
        .GetQueryable()
        .Include(x => x.Client)
        .FirstOrDefault(x => x.UserName == model.UserName)
              ?? throw new Exception("User does not exist.");

      if (!BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
        throw new Exception("Your password is incorrect.");

      var newDevice = await AddNewDevice(
        user,
        model.AppName,
        model.AppVersion,
        model.DeviceName,
        model.Platform
      );
      SetupUIClient(ref user);
      UpdateAccount(ref user);

      _userRepo.Update(user.Id, user);
      return new ResponseLogin(_appSetting.Value, user, newDevice.Id);
    }

    public async Task<ResponseLogin> LoginViaGoogle(RequestGoogleLoginDto model)
    {
      var client = new HttpClient();
      client.DefaultRequestHeaders.Accept.Clear();
      client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
      client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", model.AccessToken);

      var response = await client.GetAsync("https://www.googleapis.com/oauth2/v3/userinfo");
      var result = response.Content.ReadAsStringAsync().Result;
      var payload = JsonConvert.DeserializeObject<GoogleJsonWebSignature.Payload>(result);

      var entity = _userRepo
        .GetQueryable()
        .Include(x => x.Client)
        .FirstOrDefault(x => x.Email == payload.Email)
              ?? throw new Exception("User does not exist.");

      var newDevice = await AddNewDevice(
        entity,
        model.AppName,
        model.AppVersion,
        model.DeviceName,
        model.Platform
      );

      SetupUIClient(ref entity);
      UpdateAccount(ref entity);

      _userRepo.Update(entity.Id, entity);
      return new ResponseLogin(_appSetting.Value, entity, newDevice.Id);
    }

    public async Task<bool> LogOut()
    {
      _deviceRepo.Delete(CurrentDevice.Id);
      return true;
    }

    private async Task<DeviceEntity> AddNewDevice(
      UserEntity user,
      string appName,
      string appVersion,
      string deviceName,
      string platform
      )
    {
      string ipAddress;
#if DEBUG
      ipAddress = "1.1.1.1";
#else
      if (Header.TryGetValue("X-Forwarded-For", out var forwardedIps))
        ipAddress = forwardedIps.First();
      else throw new Exception("Cannot get ip address.");
#endif

      var response = await new HttpClient()
        .GetAsync($"https://ipinfo.io/{ipAddress}/json");

      var result = response.Content.ReadAsStringAsync().Result;
      var geolocation = JsonConvert.DeserializeObject<IPGeoDto>(result);
      var city = geolocation.City;
      var country = geolocation.Country;

      return _deviceRepo.Insert(new DeviceEntity
      {
        AppName = appName,
        AppVersion = appVersion,
        DeviceName = deviceName,
        Platform = platform,
        Location = (string.IsNullOrEmpty(city) ? "" : city + ", ") + country,
        IpAddress = ipAddress,
        CreatorId = user.Id,
        LastAccess = DateTime.UtcNow,
      });
    }

    private void SetupUIClient(ref UserEntity entity)
    {
      if (entity.Client == null)
        entity.Client = new ClientEntity
        {
          IsDarkMode = false,
          Language = "English"
        };
    }

    private void UpdateAccount(ref UserEntity entity)
    {
      entity.LastLogin = DateTime.Now;
      // account.PlainTextSearch = UpdatePlainTextSearch(account);
    }
  }
}
