using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace social_v2_api.Entities
{
  public class SearchHistoryEntity
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("history")]
    public List<object> History { get; set; }
  }
}
