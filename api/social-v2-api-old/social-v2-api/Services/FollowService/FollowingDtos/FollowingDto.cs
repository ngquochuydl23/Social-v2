namespace social_v2_api.Services.FollowService.FollowingDtos
{
  public class FollowingDto
  {
    public int Id { get; set; }

    public int DestUserId { get; set; }

    public string UserName { get; set; }

    public string FullName { get; set; }

    public string Avatar { get; set; }

    public bool Followed { get; set; }

    public bool? Owned { get; set; }
  }
}
