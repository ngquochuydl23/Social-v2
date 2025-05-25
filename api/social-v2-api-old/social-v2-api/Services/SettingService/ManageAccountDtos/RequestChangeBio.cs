namespace social_v2_api.Services.SettingService.ManageAccountDtos
{
  public class RequestChangeBio: IShareFeed
  {
    public string Bio { get; set; }
    public bool HasShareFeed { get; set; }
  }
}
