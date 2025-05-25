using social_v2_api.BaseDtos;
using social_v2_api.Services.AlbumService.Dtos;
using social_v2_api.Services.CommentService.Dtos;
using social_v2_api.Services.MediaService;

namespace social_v2_api.Services.FeedService.Dtos
{
  public class FeedDto: BaseDto, IOwnedDto
  {
    public string Caption { get; set; }

    public bool Owned { get; set; }

    public string? FeedStyle { get; set; }

    public AlbumDto Album { get; set; }

    public FeedCreatorDto Creator { get; set; }

    public IEnumerable<MediaDto> Medias { get; set; }

    public IEnumerable<CommentDto> MostRelativeComments { get; set; }

    public DateTime CreateAt { get; set; }

    public DateTime LastUpdate { get; set; }

    public long LikeCount { get; set; } = 0;

    public long CommentCount { get; set; } = 0;
  }
}
