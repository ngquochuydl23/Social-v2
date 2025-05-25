using Microsoft.EntityFrameworkCore;
using social_v2_api.Entities;
using static social_v2_api.Services.SessionService.Dtos.ResponseCurrentSession;

namespace social_v2_api.Data
{
  public static class EntityConfigurationExtensions
  {
    public static void ConfigureUserEntity(this ModelBuilder builder)
    {
      builder.Entity<UserEntity>(entity =>
      {
        entity.ToTable("User");
        entity.HasKey(x => x.Id);
        entity
          .HasIndex(u => u.UserName)
          .IsUnique();
      });
    }

    public static void ConfigureClientEntity(this ModelBuilder builder)
    {
      builder.Entity<ClientEntity>(entity =>
      {
        entity.ToTable(nameof(Client));
        entity.HasKey(x => x.UserId);
        entity.HasOne(client => client.User)
              .WithOne(user => user.Client)
              .HasForeignKey<ClientEntity>(x => x.UserId);
      });
    }

    public static void ConfigureFollowEntity(this ModelBuilder builder)
    {
      builder.Entity<FollowEntity>(entity =>
      {
        entity.ToTable("Follow");
        entity
            .HasOne(following => following.CreatorUser)
            .WithMany(user => user.Followings)
            .HasForeignKey(x => x.CreatorUserId);

        entity
            .HasOne(follower => follower.DestUser)
            .WithMany(user => user.Followers)
            .HasForeignKey(x => x.DestUserId);
      });
    }

    public static void ConfigureAlbumEntity(this ModelBuilder builder)
    {
      builder.Entity<AlbumEntity>(entity =>
      {
        entity.ToTable("Album");
        entity.HasKey(x => x.Id);
        entity
             .HasOne(album => album.Creator)
             .WithMany(user => user.Albums)
             .HasForeignKey(album => album.CreatorId)
             .OnDelete(DeleteBehavior.Cascade);
      });
    }

    public static void ConfigureFeedEntity(this ModelBuilder builder)
    {
      builder.Entity<FeedEntity>(entity =>
      {
        entity.ToTable("Feed");
        entity.HasKey(x => x.Id);
        entity
             .HasOne(feed => feed.Creator)
             .WithMany(user => user.Feeds)
             .HasForeignKey(feed => feed.CreatorId)
             .OnDelete(DeleteBehavior.Cascade);

        entity
            .HasOne(feed => feed.Album)
            .WithMany(ablum => ablum.Feeds)
            .HasForeignKey(feed => feed.AlbumId)
            .OnDelete(DeleteBehavior.Cascade);
      });
    }

    public static void ConfigureMediaEntity(this ModelBuilder builder)
    {
      builder.Entity<MediaEntity>(entity =>
      {
        entity.ToTable("Media");
        entity.HasKey(x => x.Id);
        entity
             .HasOne(media => media.Creator)
             .WithMany(user => user.Medias)
             .HasForeignKey(media => media.CreatorId)
             .OnDelete(DeleteBehavior.Cascade);

        entity
          .HasOne(media => media.Album)
          .WithMany(album => album.Medias)
          .HasForeignKey(media => media.AlbumId)
          .OnDelete(DeleteBehavior.Cascade);

        entity
         .HasOne(media => media.Feed)
         .WithMany(feed => feed.Medias)
         .HasForeignKey(media => media.FeedId)
         .OnDelete(DeleteBehavior.Cascade);
      });
    }

    public static void ConfigureCommentEntity(this ModelBuilder builder)
    {
      builder.Entity<CommentEntity>(entity =>
      {
        entity.ToTable("Comment");
        entity.HasKey(x => x.Id);
        entity
             .HasOne(comment => comment.Creator)
             .WithMany(user => user.Comments)
             .HasForeignKey(comment => comment.CreatorId)
             .OnDelete(DeleteBehavior.Cascade);

        entity
          .HasOne(comment => comment.Feed)
          .WithMany(feed => feed.Comments)
          .HasForeignKey(media => media.FeedId)
          .OnDelete(DeleteBehavior.Cascade);

        entity
          .HasOne(comment => comment.Story)
          .WithMany(story => story.Comments)
          .HasForeignKey(comment => comment.StoryId)
          .OnDelete(DeleteBehavior.Cascade);
      });
    }

    public static void ConfigureLikeEntity(this ModelBuilder builder)
    {
      builder.Entity<LikeEntity>(entity =>
      {
        entity.ToTable("Like");
        entity.HasKey(x => x.Id);
        entity
             .HasOne(like => like.Creator)
             .WithMany(acc => acc.Likes)
             .HasForeignKey(like => like.CreatorId)
             .OnDelete(DeleteBehavior.Cascade);

        entity
          .HasOne(like => like.Feed)
          .WithMany(feed => feed.Likes)
          .HasForeignKey(like => like.FeedId)
          .OnDelete(DeleteBehavior.Cascade);

        entity
          .HasOne(like => like.Story)
          .WithMany(story => story.Likes)
          .HasForeignKey(like => like.StoryId)
          .OnDelete(DeleteBehavior.Cascade);
      });
    }

    public static void ConfigureStoryEntity(this ModelBuilder builder)
    {
      builder.Entity<StoryEntity>(entity =>
      {
        entity.ToTable("Story");
        entity.HasKey(x => x.Id);
        entity
             .HasOne(story => story.Creator)
             .WithMany(user => user.Stories)
             .HasForeignKey(story => story.CreatorId)
             .OnDelete(DeleteBehavior.Cascade);
      });
    }

    public static void ConfigureViewedStoryEntity(this ModelBuilder builder)
    {
      builder.Entity<ViewedStoryEntity>(entity =>
      {
        entity.ToTable("ViewedStory");
        entity.HasKey(x => x.Id);
        entity
             .HasOne(viewedStory => viewedStory.Story)
             .WithMany(story => story.Viewers)
             .HasForeignKey(viewedStory => viewedStory.StoryId)
             .OnDelete(DeleteBehavior.Cascade);
        entity
             .HasOne(viewedStory => viewedStory.Viewer)
             .WithMany(user => user.ViewedStories)
             .HasForeignKey(viewedStory => viewedStory.UserId)
             .OnDelete(DeleteBehavior.Cascade);
      });
    }

    public static void ConfigureDeviceEntity(this ModelBuilder builder)
    {
      builder.Entity<DeviceEntity>(entity =>
      {
        entity.ToTable("Device");
        entity.HasIndex(x => x.Id);
        entity.HasKey(x => x.Id);
        entity
             .HasOne(device => device.Creator)
             .WithMany(user => user.Devices)
             .HasForeignKey(device => device.CreatorId)
             .OnDelete(DeleteBehavior.Cascade);
      });
    }
  }
}
