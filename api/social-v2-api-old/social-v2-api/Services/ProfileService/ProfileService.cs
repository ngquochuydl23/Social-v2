using AutoMapper;
using Microsoft.EntityFrameworkCore;
using social_v2_api.Entities;
using social_v2_api.Repositories.EfRepository;
using social_v2_api.Services.AlbumService.Dtos;
using social_v2_api.Services.FollowService;
using social_v2_api.Services.MediaService;
using social_v2_api.Services.ProfileService.ProfileDtos;

namespace social_v2_api.Services.ProfileService
{
  public class ProfileService : BaseService, IProfileService
  {
    private readonly IFollowService _followService;
    private readonly IEfRepository<UserEntity> _userRepo;
    private readonly IEfRepository<MediaEntity> _mediaRepo;
    private readonly IEfRepository<AlbumEntity> _albumRepo;
    private readonly IMapper _mapper;
    public ProfileService(
      IEfRepository<UserEntity> userRepo,
      IEfRepository<AlbumEntity> albumRepo,
      IEfRepository<MediaEntity> mediaRepo,
      IMapper mapper,
      IFollowService followService,
      IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
    {
      _mapper = mapper;
      _userRepo = userRepo;
      _mediaRepo = mediaRepo;
      _albumRepo = albumRepo;
      _followService = followService;
    }

    public IEnumerable<AlbumDto> GetAlbums(string? username)
    {
      var entities = _albumRepo
        .GetQueryableNoTracking()
        .Include(x => x.Creator)
        .Where(x => !string.IsNullOrEmpty(username) ? x.Creator.UserName == username : x.CreatorId == Id)
        .ToList();

      return _mapper.Map<IEnumerable<AlbumDto>>(entities);
    }

    public IEnumerable<MediaDto> GetImages(string? username)
    {
      var entities = _mediaRepo
        .GetQueryableNoTracking()
        .Include(x => x.Creator)
        .Where(x => !string.IsNullOrEmpty(username) ? x.Creator.UserName == username : x.CreatorId == Id)
        .OrderByDescending(x => x.CreateAt)
        .ToList();

      return _mapper.Map<IEnumerable<MediaDto>>(entities);
    }

    public ProfileDto? GetProfileByUserName(string? username)
    {
      var entity = _userRepo
        .GetQueryableNoTracking()
        .FirstOrDefault(x => x.UserName == username);

      var dto = _mapper.Map<ProfileDto>(entity);
      dto.Owned = dto.Id == Id;
      if (!dto.Owned)
      {
        dto.Followed = _followService.CheckHasFollowed(dto.Id);
      }
      return dto;
    }
  }
}
