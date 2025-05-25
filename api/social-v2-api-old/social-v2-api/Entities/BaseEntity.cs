namespace social_v2_api.Entities
{
  public abstract class BaseEntity
  {
    
  }

  public abstract class BaseEntity<TKey>: BaseEntity
  {
    public virtual TKey Id { get; set; }
  }
}
