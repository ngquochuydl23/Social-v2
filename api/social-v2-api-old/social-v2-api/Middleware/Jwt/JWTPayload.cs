namespace social_v2_api.Middleware.Jwt
{
  public class JWTPayload
  {
    public long Id { get; set; }
    public string Username { get; set; }
    public long DeviceId { get; set; }
    public long Exp { get; set; }
  }
}
