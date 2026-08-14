using FPSX_Group.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace FPSX_Group.Controllers
{
    public class CusController : Controller
    {
        public IActionResult Trang_Chu()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
