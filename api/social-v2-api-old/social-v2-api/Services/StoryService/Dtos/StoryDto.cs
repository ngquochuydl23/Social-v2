using social_v2_api.BaseDtos;
using social_v2_api.Services.CommentService.Dtos;

namespace social_v2_api.Services.StoryService.Dtos
{
  public class StoryDto : BaseDto, IOwnedDto
  {
    public long LikeCount { get; set; } = 0;

    public long CommentCount { get; set; } = 0;

    public long Duration { get; set; } = 0;

    public string? MediaUrl { get; set; }

    public string? MediaType { get; set; }

    public DateTime CreateAt { get; set; }

    public DateTime LastUpdate { get; set; }

    public long? ViewerCount { get; set; }

    public bool Owned { get; set; }
  }
}
