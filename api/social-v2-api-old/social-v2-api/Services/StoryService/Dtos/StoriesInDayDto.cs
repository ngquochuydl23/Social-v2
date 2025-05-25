using AutoMapper;
using social_v2_api.BaseDtos;
using social_v2_api.Entities;

namespace social_v2_api.Services.StoryService.Dtos
{
  public class StoriesInDayDto: IOwnedDto
  {
    public BaseCreatorDto Creator { get; set; }

    public int StoryCount { get; set; }

    public string LastThumbnail { get; set; }

    public DateTime LastAdded { get; set; }

    public IEnumerable<StoryDto> Stories { get; set; }

    public bool Owned { get; set; }

    public StoriesInDayDto(IMapper mapper, IGrouping<UserEntity?, StoryEntity> group, long userId) {

      var lastStory = group
        .OrderByDescending(x => x.CreateAt)
        .First();

      var creator = group.Key;

      Creator = mapper.Map<BaseCreatorDto>(creator);
      StoryCount = group.Count();
      LastThumbnail = lastStory
        .MediaType.StartsWith("image")
          ? lastStory.MediaUrl 
          : lastStory.Thumbnail;
      LastAdded = lastStory.CreateAt;
      Owned = creator.Id == userId;
      Stories = group.Select(x => mapper.Map<StoryDto>(x));

    }
  }
}
