using social_v2_api.Entities;
using social_v2_api.Services.AlbumService.Dtos;
using social_v2_api.Services.MediaService;
using social_v2_api.Services.ProfileService.ProfileDtos;

namespace social_v2_api.Services.ProfileService
{
  public interface IProfileService
  {
    ProfileDto? GetProfileByUserName(string? username);

    IEnumerable<AlbumDto> GetAlbums(string? username);

    IEnumerable<MediaDto> GetImages(string? username);
  }
}
