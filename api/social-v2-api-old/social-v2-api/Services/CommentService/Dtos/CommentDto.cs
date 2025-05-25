using social_v2_api.BaseDtos;
using social_v2_api.Entities;

namespace social_v2_api.Services.CommentService.Dtos
{
  public class CommentDto : BaseDto, IOwnedDto
  {
    public string? Content { get; set; }

    public string? MediaUrl { get; set; }

    public string? MediaType { get; set; }

    public DateTime CreateAt { get; set; }

    public DateTime LastUpdate { get; set; }

    public long LikeCount { get; set; } = 0;

    public long ReplyCount { get; set; } = 0;

    public long? FeedId { get; set; }

    public long? ParentId { get; set; }

    public CommentCreatorDto Creator { get; set; }

    public bool Owned { get; set; }

    public ICollection<CommentDto> Childs { get; set; }

  }
}
