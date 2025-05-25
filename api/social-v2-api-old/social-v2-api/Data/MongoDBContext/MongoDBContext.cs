using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using social_v2_api.Entities;
using social_v2_api.Helpers;

namespace social_v2_api.Data.MongoContext
{
  public class MongoDBContext : IMongoDBContext
  {
    private IMongoDatabase _db { get; set; }
    private MongoClient _mongoClient { get; set; }
    public MongoDBContext(IOptions<MongoDbSettings> configuration)
    {
      _mongoClient = new MongoClient(configuration.Value.ConnectionURI);
      _db = _mongoClient.GetDatabase(configuration.Value.DatabaseName);
    }
      
    public IMongoCollection<T> GetCollection<T>(string name)
    {
      return _db.GetCollection<T>(name);
    }
  }
}

