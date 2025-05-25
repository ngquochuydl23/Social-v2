namespace social_v2_api.Services.FeedService.Dtos
{
  public class RequestUpdateFeed
  {
    public string? Caption { get; set; }

    public ICollection<RequestPostMedia>? Medias { get; set; }

    public string? FeedStyle { get; set; }
  }
}
