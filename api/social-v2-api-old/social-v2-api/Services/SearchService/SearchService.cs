using AutoMapper;
using social_v2_api.Entities;
using social_v2_api.Repositories.MongoRepository;
namespace social_v2_api.Services.SearchService
{
    public class SearchService : BaseService, ISearchService
  {
    private readonly IMapper _mapper;
    private readonly IMongoRepository<SearchHistoryEntity> _searchHistoryRepo;
    public SearchService(
      IMapper mapper,
      //IMongoRepository<SearchHistoryEntity> searchHistoryRepo,
      IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
    {
      _mapper = mapper;
      //_searchHistoryRepo = searchHistoryRepo;
    }

    public async Task<SearchHistoryEntity> GetSearchHistory()
    {
      return await _searchHistoryRepo.GetById(Id.ToString());
    }
  }
}
