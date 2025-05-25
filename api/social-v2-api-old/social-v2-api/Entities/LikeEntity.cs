using System.ComponentModel.DataAnnotations.Schema;

namespace social_v2_api.Entities
{
  [Table("Like")]
  public class LikeEntity : BaseEntity<long>, IHasCreationTime, ILastUpdatedTime
  {

    public DateTime CreateAt { get; set; }

    public DateTime LastUpdate { get; set; }

    public long CreatorId { get; set; }

    public long? FeedId { get; set; }

    public long? StoryId { get; set; }

    public virtual UserEntity Creator { get; set; }

    public virtual FeedEntity? Feed { get; set; }

    public virtual StoryEntity? Story { get; set; }
  }
}
