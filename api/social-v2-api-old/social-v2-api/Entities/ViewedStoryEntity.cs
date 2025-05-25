namespace social_v2_api.Entities
{
  public class ViewedStoryEntity : BaseEntity<long>, IHasCreationTime
  {
    public long UserId { get; set; }

    public long StoryId { get; set; }
    public DateTime CreateAt { get; set; }

    public virtual UserEntity? Viewer { get; set; }

    public virtual StoryEntity? Story { get; set; }
  }
}
