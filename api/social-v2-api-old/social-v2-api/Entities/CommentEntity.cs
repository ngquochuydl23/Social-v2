namespace social_v2_api.Entities
{
  public class CommentEntity : BaseEntity<long>, IHasCreationTime, ILastUpdatedTime
  {
    private ICollection<CommentEntity> _childs;

    public long? ParentId { get; set; }

    public string? Content { get; set; }

    public string? MediaUrl { get; set; }

    public DateTime CreateAt { get; set; }

    public DateTime LastUpdate { get; set; }

    public long LikeCount { get; set; }

    public long ReplyCount { get; set; } = 0;

    public long CreatorId { get; set; } = 0;

    public long? StoryId { get; set; }

    public long? FeedId { get; set; }

    public virtual UserEntity Creator { get; set; }

    public virtual FeedEntity? Feed { get; set; }

    public virtual StoryEntity? Story { get; set; }

    public virtual CommentEntity? Parent { get; set; }

    public virtual ICollection<CommentEntity> Childs
    {
      get => _childs ??= new List<CommentEntity>();
      set => _childs = value;
    }

    public string? MediaType { get; set; }
  }
}
