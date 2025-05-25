using social_v2_api.BaseDtos;
using social_v2_api.Services.FeedService.Dtos;

namespace social_v2_api.Services.LikeService.Dtos
{
  public class LikeDto : BaseDto, IOwnedDto
  {
    public DateTime CreateAt { get; set; }

    public BaseCreatorDto Creator { get; set; }

    public long? FeedId { get; set; }

    public bool Owned { get; set; }
  }
}
