using Microsoft.AspNetCore.Mvc;

namespace FPSX_Group.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
