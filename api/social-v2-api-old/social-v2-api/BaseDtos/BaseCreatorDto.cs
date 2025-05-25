namespace social_v2_api.BaseDtos
{
  public class BaseCreatorDto : IFollowedDto
  {
    public int Id { get; set; }

    public string FullName { get; set; }

    public string UserName { get; set; }

    public string Avatar { get; set; }

    public bool? Followed { get; set; }
  }
}
