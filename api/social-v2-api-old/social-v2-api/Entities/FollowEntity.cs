namespace social_v2_api.Entities
{
  public class FollowEntity : BaseEntity<long>, IHasCreationTime
  {
    public long? DestUserId { get; set; }

    public long? CreatorUserId { get; set; }

    public DateTime CreateAt { get; set; }

    public virtual UserEntity DestUser { get; set; }

    public virtual UserEntity CreatorUser { get; set; }
  }
}
