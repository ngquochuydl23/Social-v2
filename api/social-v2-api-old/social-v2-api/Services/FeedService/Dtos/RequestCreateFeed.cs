namespace social_v2_api.Services.FeedService.Dtos
{
  public class RequestCreateFeed
  {
    public string? Caption { get; set; }

    public ICollection<RequestPostMedia>? Medias { get; set; }

    public long? AlbumId { get; set; }

    public string? FeedStyle { get; set; }
  }
}
