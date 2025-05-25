using Amazon.Auth.AccessControlPolicy;
using System.Text.Json.Serialization;

namespace social_v2_api.BaseDtos
{
  public interface IFollowedDto
  {
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Followed { get; set; }
  }
}
