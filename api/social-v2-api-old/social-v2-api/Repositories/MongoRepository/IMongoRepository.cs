namespace social_v2_api.Repositories.MongoRepository
{
  public interface IMongoRepository<TEntity>
  {
    Task<TEntity> Add(TEntity obj);

    Task<TEntity> GetById(string id);

    Task<IEnumerable<TEntity>> GetAll();

    Task<TEntity> Update(string id, TEntity obj);

    Task<bool> Remove(string id);
  }
}
