using Microsoft.AspNetCore.Mvc;

namespace FPSX_Group.Controllers
{
    public class TaiXiuController : Controller
    {
        [HttpGet]
        public IActionResult Trang_TX()
        {
            return View();
        }
    }
}
