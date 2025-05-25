namespace social_v2_api.Services.SettingService.ManageAccountDtos
{
  public class ResponseChangeAvatar
  {
    public string Avatar { get; set; }

    public long? FeedId { get; set; }
    public ResponseChangeAvatar(string Avatar)
    {
      this.Avatar = Avatar;
    }

    public ResponseChangeAvatar(string Avatar, long FeedId)
    {
      this.Avatar = Avatar;
      this.FeedId = FeedId;
    }
  }
}
