using social_v2_api.Data;

namespace social_v2_api.Repositories.EfRepository
{
  public interface IEfRepository<TEntity>
  {
    TEntity Find(long? key);

    TEntity Insert(TEntity entity);

    TEntity[] InsertMany(TEntity[] entities);

    TEntity Update(long key, TEntity entity);

    void Delete(long key);

    void Delete(TEntity entity);

    void DeleteRange(TEntity[] entities);

    IQueryable<TEntity> GetQueryableNoTracking();

    IQueryable<TEntity> GetQueryable();

    ApplicationDbContext DbContext();
  }
}
