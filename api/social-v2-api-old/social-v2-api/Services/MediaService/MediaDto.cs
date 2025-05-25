using social_v2_api.BaseDtos;

namespace social_v2_api.Services.MediaService
{
  public class MediaDto: BaseDto, IOwnedDto
  {
    public int Id { get; set; }

    public bool Owned { get; set; }

    public string Url { get; set; }

    public DateTime CreateAt { get; set; }

    public string MediaType { get; set; }

    //public MediaCreatorDto Creator { get; set; }
    
    public string Caption { get; set; }

    public long Duration { get; set; }

    public long Views { get; set; }
  }
}
