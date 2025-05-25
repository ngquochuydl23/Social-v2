using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace social_v2_api.Entities
{
  public class StoryEntity : BaseEntity<long>, IHasCreationTime, ILastUpdatedTime
  {
    private ICollection<CommentEntity> _comments;
    private ICollection<LikeEntity> _likes;
    private ICollection<ViewedStoryEntity> _viewers;

    public long CreatorId { get; set; }

    public long LikeCount { get; set; } = 0;

    public long CommentCount { get; set; } = 0;

    public virtual UserEntity? Creator { get; set; }

    public DateTime CreateAt { get; set; }

    public DateTime LastUpdate { get; set; }

    public string? Thumbnail { get; set; }

    public string MediaUrl { get; set; }

    public string MediaType { get; set; }

    public long? Duration { get; set; } = 0;

    public long? ViewerCount { get; set; } = 0;

    public virtual ICollection<CommentEntity> Comments
    {
      get => _comments ??= new List<CommentEntity>();
      set => _comments = value;
    }
    
    public virtual ICollection<LikeEntity> Likes
    {
      get => _likes ??= new List<LikeEntity>();
      set => _likes = value;
    }

    public virtual ICollection<ViewedStoryEntity> Viewers
    {
      get => _viewers ??= new List<ViewedStoryEntity>();
      set => _viewers = value;
    }
  }
}
