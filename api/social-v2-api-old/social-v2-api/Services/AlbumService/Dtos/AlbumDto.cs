using social_v2_api.BaseDtos;
using social_v2_api.Services.MediaService;

namespace social_v2_api.Services.AlbumService.Dtos
{
  public class AlbumDto : BaseDto, IOwnedDto
  {
    public int Id { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public DateTime CreateAt { get; set; }

    public bool Removable { get; set; }

    public string Thumbnail { get; set; }

    public int Count { get; set; } = 0;

    public bool Owned { get; set; }

    public IEnumerable<MediaDto> Medias { get; set; }
  }
}
