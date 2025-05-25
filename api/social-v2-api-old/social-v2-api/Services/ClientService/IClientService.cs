using social_v2_api.Entities;
using social_v2_api.Services.ClientService.Dtos;

namespace social_v2_api.Services.ClientService
{
  public interface IClientService
  {
    bool UpdateUiMode(RequestUpdateUiMode model);

    ClientDto GetCurrentClientState();

    ClientEntity? GetClientEntityByUserId(long userId);

    bool UpdateLanguage(RequestUpdateLanguage model);
  }
}
