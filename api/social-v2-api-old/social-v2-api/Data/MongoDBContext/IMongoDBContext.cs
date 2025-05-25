using MongoDB.Driver;
using social_v2_api.Entities;

namespace social_v2_api.Data.MongoContext
{
  public interface IMongoDBContext
  {
    IMongoCollection<TEntity> GetCollection<TEntity>(string name);
  }
}
