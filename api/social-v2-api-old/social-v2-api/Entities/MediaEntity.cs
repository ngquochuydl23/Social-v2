namespace social_v2_api.Entities
{
  public class MediaEntity : BaseEntity<long>, IHasCreationTime
  {
    public string Url { get; set; }

    public DateTime CreateAt { get; set; }

    public long CreatorId { get; set; }

    public long? AlbumId { get; set; }

    public long? FeedId { get; set; }

    public string MediaType { get; set; }

    public long? Duration { get; set; }

    public long? Viewers { get; set; }

    public string? Caption { get; set; }

    public virtual UserEntity? Creator { get; set; }

    public virtual AlbumEntity? Album { get; set; }

    public virtual FeedEntity? Feed { get; set; }
  }
}
