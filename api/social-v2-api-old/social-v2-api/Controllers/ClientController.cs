using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using social_v2_api.Helpers;
using social_v2_api.Services.ClientService;
using social_v2_api.Services.ClientService.Dtos;

namespace social_v2_api.Controllers
{
  public class ClientController : BaseController
  {
    private readonly IClientService _clientService;
    public ClientController(
      IOptions<AppSettings> appSettings,
      IClientService clientService
      ) : base(appSettings)
    {
      _clientService = clientService;
    }

    [HttpGet(nameof(GetCurrentClientState))]
    public IActionResult GetCurrentClientState()
    {
      return Ok(_clientService.GetCurrentClientState());
    }

    [HttpPatch(nameof(UpdateUiMode))]
    public IActionResult UpdateUiMode([FromBody] RequestUpdateUiMode model)
    {
      return Ok(_clientService.UpdateUiMode(model));
    }

    [HttpPatch(nameof(UpdateLanguage))]
    public IActionResult UpdateLanguage([FromBody] RequestUpdateLanguage model)
    {
      return Ok(_clientService.UpdateLanguage(model));
    }
  }
}
