namespace social_v2_api.Services.SettingService.ManageAccountDtos
{
  public class ResponseChangeBio 
  {
    public string Bio { get; set; }

    public ResponseChangeBio(string Bio)
    {
      this.Bio = Bio;
    }
  }
}
