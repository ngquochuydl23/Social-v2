using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace social_v2_api.Entities
{
  public class FeedEntity : BaseEntity<long>, IHasCreationTime, ILastUpdatedTime
  {
    private ICollection<MediaEntity> medias;
    private ICollection<CommentEntity> _comments;
    private ICollection<LikeEntity> _likes;

    [Column(TypeName = "varchar(2200)")]
    public string? Caption { get; set; }

    [Column(TypeName = "varchar(50)")]
    public string? FeedStyle { get; set; }

    public long CreatorId { get; set; }

    public long? AlbumId { get; set; }

    public long LikeCount { get; set; } = 0;

    public long CommentCount { get; set; } = 0;

    public virtual UserEntity? Creator { get; set; }

    public virtual AlbumEntity? Album { get; set; }

    public DateTime CreateAt { get; set; }
    public DateTime LastUpdate { get; set; }

    public virtual ICollection<MediaEntity> Medias
    {
      get => medias ??= new List<MediaEntity>();
      set => medias = value;
    }

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
  }
}
