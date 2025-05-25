using social_v2_api.BaseDtos;
using System.ComponentModel.DataAnnotations;

namespace social_v2_api.Services.ProfileService.ProfileDtos
{
  public class ProfileDto: IOwnedDto, IFollowedDto
  {
    public int Id { get; set; }

    public string UserName { get; set; }

    public string FullName { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Avatar { get; set; }

    public string Bio { get; set; }

    public string Cover { get; set; }

    public bool Owned { get; set; }

    public bool? Followed { get; set; }

    public long FollowerCount { get; set; } = 0;

    public long FollowingCount { get; set; } = 0;
  }
}
