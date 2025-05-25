using Microsoft.AspNetCore.Mvc;

namespace social_v2_api.Controllers
{
  public class HomeController: Controller
  {
    public IActionResult Index()
    {
      return Redirect("~/swagger");
    }
  }
}
