namespace social_v2_api.Entities
{
  public class ClientEntity : BaseEntity
  {
    public virtual UserEntity? User { get; set; }

    public long UserId { get; set; }

    public bool IsDarkMode { get; set; }

    public string Language { get; set; }
  }
}
