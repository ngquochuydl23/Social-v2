using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using social_v2_api.Entities;
using System.Security.Principal;

namespace social_v2_api.Data
{
  public class ApplicationDbContext : DbContext
  {
    public DbSet<UserEntity> User { get; set; }

    public DbSet<ClientEntity> Client { get; set; }

    public DbSet<FollowEntity> Follow { get; set; }

    public DbSet<FeedEntity> Feed { get; set; }

    public DbSet<MediaEntity> Media { get; set; }

    public DbSet<AlbumEntity> Album { get; set; }

    public DbSet<CommentEntity> Comment { get; set; }

    public DbSet<LikeEntity> Like { get; set; }

    public DbSet<StoryEntity> Story { get; set; }

    public DbSet<ViewedStoryEntity> ViewedStory { get; set; }

    public DbSet<DeviceEntity> Device { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.ConfigureUserEntity();
      modelBuilder.ConfigureClientEntity();
      modelBuilder.ConfigureFollowEntity();
      modelBuilder.ConfigureFeedEntity();
      modelBuilder.ConfigureMediaEntity();
      modelBuilder.ConfigureAlbumEntity();
      modelBuilder.ConfigureCommentEntity();
      modelBuilder.ConfigureLikeEntity();
      modelBuilder.ConfigureStoryEntity();
      modelBuilder.ConfigureViewedStoryEntity();
      modelBuilder.ConfigureDeviceEntity();
      base.OnModelCreating(modelBuilder);
    }
  }
}
