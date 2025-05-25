namespace social_v2_api.Services.SettingService.ManageAccountDtos
{
  public class ResponseChangeCover  
  {
    public string Cover { get; set; }

    public ResponseChangeCover(string Cover)
    {
      this.Cover = Cover;
    }
  }
}
