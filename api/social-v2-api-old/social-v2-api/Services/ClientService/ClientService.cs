using AutoMapper;
using social_v2_api.Entities;
using social_v2_api.Repositories.EfRepository;
using social_v2_api.Services.ClientService.Dtos;

namespace social_v2_api.Services.ClientService
{
  public class ClientService : BaseService, IClientService
  {
    private readonly IEfRepository<ClientEntity> _clientRepo;
    private readonly IMapper _mapper;
    public ClientService(
      IEfRepository<ClientEntity> clientRepo,
      IMapper mapper,
      IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
    {
      _mapper = mapper;
      _clientRepo = clientRepo;
    }

    public ClientEntity? GetClientEntityByUserId(long userId)
    {
      return _clientRepo
        .GetQueryable()
        .FirstOrDefault(x => x.UserId == userId);
    }

    public ClientDto GetCurrentClientState()
    {
      return _mapper.Map<ClientDto>(GetClientEntityByUserId(Id));
    }

    public bool UpdateLanguage(RequestUpdateLanguage model)
    {
      if (model == null)
        throw new NullReferenceException();

      var client = _clientRepo
        .GetQueryable()
        .FirstOrDefault(x => x.UserId == Id)
        ?? throw new NullReferenceException();

      client.Language = model.Language;
      _clientRepo.Update(client.UserId, client);

      return true;
    }

    public bool UpdateUiMode(RequestUpdateUiMode model)
    {
      if (model == null)
        throw new NullReferenceException();

      var client = _clientRepo
        .GetQueryable()
        .FirstOrDefault(x => x.UserId == Id)
        ?? throw new NullReferenceException();

      client.IsDarkMode = model.IsDarkMode;
      _clientRepo.Update(client.UserId, client);

      return true;
    }
  }
}
