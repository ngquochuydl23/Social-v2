namespace social_v2_api.Services.StoryService.Dtos
{
  public class CreateStoryDto
  {
    public string MediaUrl { get; set; }

    public string MediaType { get; set; }

    public string AudienceType { get; set; }

    public long Duration { get; set; } = 0;
  }
}
