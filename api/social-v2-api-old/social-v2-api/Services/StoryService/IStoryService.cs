using social_v2_api.Services.StoryService.Dtos;

namespace social_v2_api.Services.StoryService
{
  public interface IStoryService
  {
    StoryDto CreateStory(CreateStoryDto model);

    bool DeleteStory(long storyId);

    bool UpdateAudience(long storyId);

    bool SaveStoryToCollection(long storyId, long collectionId);

    bool WatchStory(long storyId);

    IEnumerable<StoryViewerDto> GetViewers(long storyId);

    IEnumerable<object> GetStoriesInDay();

    IEnumerable<StoryDto> GetAllStoredStories();
  }
}
