using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace social_v2_api.Entities
{
  public class AlbumEntity : BaseEntity<long>, IHasCreationTime
  {
    private ICollection<MediaEntity> medias;
    private ICollection<FeedEntity> _feed;

    [Column(TypeName = "varchar(50)")]
    public string Name { get; set; }

    [Column(TypeName = "varchar(255)")]
    public string? Description { get; set; }

    public DateTime CreateAt { get; set; }

    public bool Removable { get; set; } = true;

    public long CreatorId { get; set; }

    public string? Thumbnail { get; set; }

    public long Count { get; set; } = 0;

    public virtual UserEntity Creator { get; set; }

    public virtual ICollection<MediaEntity> Medias
    {
      get => medias ??= new List<MediaEntity>();
      set => medias = value;
    }

    public virtual ICollection<FeedEntity> Feeds
    {
      get => _feed ??= new List<FeedEntity>();
      set => _feed = value;
    }
  }
}
