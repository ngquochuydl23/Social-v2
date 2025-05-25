using AutoMapper;
using Microsoft.EntityFrameworkCore;
using social_v2_api.Entities;
using social_v2_api.Repositories.EfRepository;
using social_v2_api.Services.AlbumService.Dtos;
using social_v2_api.Services.MediaService;

namespace social_v2_api.Services.AlbumService
{
    public class AlbumService : BaseService, IAlbumService
  {
    private readonly IEfRepository<AlbumEntity> _albumRepo;
    private readonly IMapper _mapper;
    public AlbumService(
      IEfRepository<AlbumEntity> albumRepo,
      IMapper mapper,
      IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
    {
      _mapper = mapper;
      _albumRepo = albumRepo;
    }
    public AlbumDto Create(RequestCreateAlbum model, bool canDelete = true)
    {
      throw new NotImplementedException();
    }

    public AlbumEntity CreateAvatarAlbum()
    {
      return _albumRepo.Insert(new AlbumEntity()
      {
        CreatorId = Id,
        Removable = false,
        Name = "Avatar",
      });
    }

    public AlbumEntity CreateCoverAlbum()
    {
      throw new NotImplementedException();
    }

    public AlbumEntity FindAlbumEntityById(int id)
    {
      throw new NotImplementedException();
    }

    public AlbumEntity FindAlbumEntityByName(string name)
    {
      throw new NotImplementedException();
    }

    public AlbumDto GetAlbumDetail(long albumId)
    {
      if (albumId == 0)
        throw new ArgumentException(nameof(albumId));

      var entity = _albumRepo
        .GetQueryableNoTracking()
        .Include(x => x.Medias)
        .FirstOrDefault(x => x.Id == albumId);

      return _mapper.Map<AlbumDto>(entity);
    }

    public IEnumerable<AlbumDto> GetAll(string? username)
    {
      var entities = _albumRepo
        .GetQueryableNoTracking()
        .Include(x => x.Creator)
        .Where(x => !string.IsNullOrEmpty(username) ? x.Creator.UserName == username : x.CreatorId == Id)
        .ToList();
      return _mapper.Map<IEnumerable<AlbumDto>>(entities);
    }
  }
}
