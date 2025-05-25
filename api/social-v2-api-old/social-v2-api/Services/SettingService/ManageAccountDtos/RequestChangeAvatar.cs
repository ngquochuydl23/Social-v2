namespace social_v2_api.Services.SettingService.ManageAccountDtos
{
  public class RequestChangeAvatar: IShareFeed
  {
    public string AvatarUrl { get; set; }

    public string? Caption { get; set; }

    public string MediaType { get; set; }

    public bool HasShareFeed { get; set; }
  }
}
