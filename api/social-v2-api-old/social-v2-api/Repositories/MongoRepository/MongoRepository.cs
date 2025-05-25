using MongoDB.Driver;
using social_v2_api.Data.MongoContext;
using social_v2_api.Entities;

namespace social_v2_api.Repositories.MongoRepository
{
  public class MongoRepository<TEntity> : IMongoRepository<TEntity> where TEntity : class
  {
    protected readonly IMongoDBContext _mongoContext;
    protected readonly IMongoCollection<TEntity> _dbCollection;

    protected MongoRepository(IMongoDBContext context)
    {
      _mongoContext = context;
      _dbCollection = _mongoContext.GetCollection<TEntity>(typeof(TEntity).Name);
    }

    public virtual async Task<TEntity> Add(TEntity obj)
    {
      await _dbCollection.InsertOneAsync(obj);
      return obj;
    }

    public virtual void Dispose()
    {
      GC.SuppressFinalize(this);
    }

    public virtual async Task<IEnumerable<TEntity>> GetAll()
    {
      var all = await _dbCollection.FindAsync(Builders<TEntity>.Filter.Empty);
      return all.ToList();
    }

    public virtual async Task<TEntity> GetById(string id)
    {
      var data = await _dbCollection.Find(FilterId(id)).SingleOrDefaultAsync();
      return data;
    }

    public virtual async Task<bool> Remove(string id)
    {
      var result = await _dbCollection.DeleteOneAsync(FilterId(id));
      return result.IsAcknowledged;
    }

    public virtual async Task<TEntity> Update(string id, TEntity obj)
    {
      await _dbCollection.ReplaceOneAsync(FilterId(id), obj);
      return obj;
    }

    private static FilterDefinition<TEntity> FilterId(string key)
    {
      return Builders<TEntity>.Filter.Eq("Id", key);
    }
  }
}
