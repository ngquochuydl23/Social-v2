namespace social_v2_api.Services.SettingService.SecurityAndPrivacyDtos
{
  public class ResponseChangePassword
  {
    public string Message { get; set; }

    public ResponseChangePassword(string message)
    {
      Message = message;
    }
  }
}
