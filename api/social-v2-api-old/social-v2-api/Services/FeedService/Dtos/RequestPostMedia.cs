namespace social_v2_api.Services.FeedService.Dtos
{
  public class RequestPostMedia
  {
    public long? Id { get; set; }

    public string Url { get; set; }

    public string MediaType { get; set; }

    public RequestPostMedia(long? id,string url, string mediaType)
    {
      Id = id;
      Url = url;
      MediaType = mediaType;
    }
  }
}
