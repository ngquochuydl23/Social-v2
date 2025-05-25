namespace social_v2_api.Services.SettingService.ManageAccountDtos
{
  public class RequestChangeCover: IShareFeed
  {
    public string CoverUrl { get; set; }
    public bool HasShareFeed { get; set; }
  }
}
