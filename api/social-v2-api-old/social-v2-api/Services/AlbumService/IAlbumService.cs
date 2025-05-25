using social_v2_api.Entities;
using social_v2_api.Services.AlbumService.Dtos;

namespace social_v2_api.Services.AlbumService
{
  public interface IAlbumService
  {
    AlbumDto Create(RequestCreateAlbum model, bool canDelete = true);

    AlbumEntity FindAlbumEntityByName(string name);

    AlbumEntity CreateAvatarAlbum();

    AlbumEntity CreateCoverAlbum();

    AlbumEntity FindAlbumEntityById(int id);

    IEnumerable<AlbumDto> GetAll(string? username);

    AlbumDto GetAlbumDetail(long albumId);
  }
}
