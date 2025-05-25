namespace social_v2_api.Services.SettingService.SecurityAndPrivacyDtos
{
  public class RequestChangePassword
  {
    public string CurrentPassword { get; set; }
    public string NewPassword { get; set; }
  }
}
