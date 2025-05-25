

using social_v2_api.Entities;
using social_v2_api.Services.CommentService.Dtos;

namespace social_v2_api.Services.CommentService
{
  public interface ICommentService
  {
    CommentDto CreateComment(long feedId, long? parentId,CreateUpdateComment model);

    CommentDto UpdateComment(long commentId, CreateUpdateComment model);

    IEnumerable<CommentDto> GetCommentsByFeedId(long feedId);

    void DeleteComment(long? commentId);
  }
}
