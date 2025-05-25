using MongoDB.Driver;
using social_v2_api.Entities;
using social_v2_api.Services.SearchService.Dtos;

namespace social_v2_api.Services.SearchService
{
  public interface ISearchService
  {
    Task<SearchHistoryEntity> GetSearchHistory();
  }
}
