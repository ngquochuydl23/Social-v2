using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace social_v2_api.Entities
{
  public class UserEntity : BaseEntity<long>, IHasCreationTime, ILastUpdatedTime
  {
    private ICollection<FollowEntity> _followings;
    private ICollection<FollowEntity> _followers;
    private ICollection<MediaEntity> _medias;
    private ICollection<AlbumEntity> _album;
    private ICollection<FeedEntity> _feed;
    private ICollection<CommentEntity> _comments;
    private ICollection<LikeEntity> _likes;
    private ICollection<StoryEntity> _stories;
    private ICollection<ViewedStoryEntity> _viewedStories;
    private ICollection<DeviceEntity> _devices;

    [Required]
    [MaxLength(25)]
    [Column(TypeName = "varchar(25)")]
    public string UserName { get; set; }

    [Required]
    [MaxLength(255)]
    [Column(TypeName = "varchar(255)")]
    public string Password { get; set; }

    [MaxLength(50)]
    [Column(TypeName = "varchar(50)")]
    public string FullName { get; set; }

    [MaxLength(20)]
    [Column(TypeName = "varchar(20)")]
    public string FirstName { get; set; }

    [MaxLength(20)]
    [Column(TypeName = "varchar(20)")]
    public string LastName { get; set; }

    public DateTime LastUpdate { get; set; }

    public DateTime LastLogin { get; set; }

    public string? Avatar { get; set; }

    [Column(TypeName = "varchar(255)")]
    public string? Bio { get; set; }

    public string? Cover { get; set; }

    public DateTime Birthday { get; set; }

    [Column(TypeName = "varchar(12)")]
    public string? PhoneNumber { get; set; }

    [Column(TypeName = "varchar(50)")]
    public string? Email { get; set; }

    [Column(TypeName = "varchar(10)")]
    public string Gender { get; set; }

    public DateTime CreateAt { get; set; }

    public virtual ClientEntity Client { get; set; }

    public long FollowerCount { get; set; } = 0;

    public long FollowingCount { get; set; } = 0;

    public bool VerifiedEmail { get; set; } = false;

    public bool VerifiedPhoneNumber { get; set; } = false;

    public virtual ICollection<FollowEntity> Followings
    {
      get => _followings ??= new List<FollowEntity>();
      set => _followings = value;
    }
    public virtual ICollection<FollowEntity> Followers
    {
      get => _followers ??= new List<FollowEntity>();
      set => _followers = value;
    }
    public virtual ICollection<MediaEntity> Medias
    {
      get => _medias ??= new List<MediaEntity>();
      set => _medias = value;
    }
    public virtual ICollection<AlbumEntity> Albums
    {
      get => _album ??= new List<AlbumEntity>();
      set => _album = value;
    }
    
    public virtual ICollection<FeedEntity> Feeds
    {
      get => _feed ??= new List<FeedEntity>();
      set => _feed = value;
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
    
    public virtual ICollection<StoryEntity> Stories
    {
      get => _stories ??= new List<StoryEntity>();
      set => _stories = value;
    }

    public virtual ICollection<ViewedStoryEntity> ViewedStories
    {
      get => _viewedStories ??= new List<ViewedStoryEntity>();
      set => _viewedStories = value;
    }

    public virtual ICollection<DeviceEntity> Devices
    {
      get => _devices ??= new List<DeviceEntity>();
      set => _devices = value;
    }
  }
}
