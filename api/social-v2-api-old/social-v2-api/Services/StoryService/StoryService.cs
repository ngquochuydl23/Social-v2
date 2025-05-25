using AutoMapper;
using Microsoft.EntityFrameworkCore;
using social_v2_api.Entities;
using social_v2_api.Repositories.EfRepository;
using social_v2_api.Services.StoryService.Dtos;

namespace social_v2_api.Services.StoryService
{
  public class StoryService : BaseService, IStoryService
  {

    private readonly IEfRepository<StoryEntity> _storyRepo;
    private readonly IEfRepository<ViewedStoryEntity> _viewedStoryRepo;
    private readonly IEfRepository<UserEntity> _userRepo;
    private readonly IMapper _mapper;

    public StoryService(
      IEfRepository<StoryEntity> storyRepo,
      IEfRepository<ViewedStoryEntity> viewedStoryRepo,
      IEfRepository<UserEntity> userRepo,
      IMapper mapper,
      IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
    {
      _mapper = mapper;
      _storyRepo = storyRepo;
      _viewedStoryRepo = viewedStoryRepo;
      _userRepo = userRepo;
    }

    public StoryDto CreateStory(CreateStoryDto model)
    {
      var entity = _mapper.Map<StoryEntity>(model);
      entity.CreatorId = Id;

      return _mapper.Map<StoryDto>(_storyRepo.Insert(entity));
    }

    public bool DeleteStory(long storyId)
    {
      if (_storyRepo.Find(storyId) == null)
        throw new Exception("Story does not exist.");

      _storyRepo.Delete(storyId);
      return true;
    }

    public IEnumerable<StoryDto> GetAllStoredStories()
    {
      var entities = _storyRepo
        .GetQueryableNoTracking()
        .Where(x => x.CreatorId == Id)
        .OrderByDescending(x => x.CreateAt)
        .ToList();

      return entities.Select(x => _mapper.Map<StoryDto>(x));
    }

    public IEnumerable<object> GetStoriesInDay()
    {
      var storiesInDay = _storyRepo
        .GetQueryable()
        .GroupBy(x => x.Creator)
        .ToList()
        .Select(x => new StoriesInDayDto(_mapper, x, Id))
        .OrderByDescending(x => x.LastAdded)
        .Take(10);

      return storiesInDay;
    }

    public IEnumerable<StoryViewerDto> GetViewers(long storyId)
    {
      var entity = _storyRepo
        .GetQueryableNoTracking()
        .Include(x => x.Viewers)
        .ThenInclude(x => x.Viewer)
        .FirstOrDefault(x => x.Id == storyId);

      if (entity == null)
        throw new Exception("Story does not exist.");

      if (entity.CreatorId != Id)
        throw new Exception("Story does not belong to you.");

      return entity.Viewers.Select(x =>
      {
        return new StoryViewerDto
        {
          CreateAt = x.CreateAt,
          Viewer = _mapper.Map<ViewerDto>(x.Viewer)
        };
      }).OrderBy(x => x.CreateAt);
    }

    public bool SaveStoryToCollection(long storyId, long collectionId)
    {
      throw new NotImplementedException();
    }

    public bool UpdateAudience(long storyId)
    {
      throw new NotImplementedException();
    }

    public bool WatchStory(long storyId)
    {
      var entity = FindStoryById(storyId);


      _viewedStoryRepo.Insert(new ViewedStoryEntity { UserId = Id, StoryId = entity.Id });

      entity.ViewerCount = entity.Viewers.Count();
      _storyRepo.Update(entity.Id, entity);

      return true;
    }

    private StoryEntity FindStoryById(long storyId)
    {
      var entity = _storyRepo.Find(storyId);
      if (entity == null)
        throw new Exception("Story does not exist.");
      return entity;
    }
  }
}
