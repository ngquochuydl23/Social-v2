
using System.Xml.Linq;

namespace social_v2_api.Services.SessionService.Dtos
{
  public class ResponseCurrentSession
  {
    public Client ClientState { get; set; }

    public SessionUser User { get; set; }

    public int NotiBadges { get { return 0; } set { } }

    public int MessageBadges { get { return 0; } set { } }
    public class Client
    {
      public string Language { get; set; }
      public bool IsDarkMode { get; set; }
    }

    public class SessionUser
    {
      public int Id { get; set; }

      public string UserName { get; set; }

      public string Fullname { get; set; }

      public string FirstName { get; set; }

      public string LastName { get; set; }

      public string Avatar { get; set; }

      public string Bio { get; set; }

      public string Cover { get; set; }

      public string Gender { get; set; }

      public long FollowerCount { get; set; }

      public long FollowingCount { get; set; }
    }
  }
}
