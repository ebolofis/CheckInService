using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using CheckinBack.MainLogic;
using CheckinBack.Models;

using CheckInService.Models;

namespace PreCheckin.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly HotelsML _hotelsML;
        private HotelInfoModel _hotelInfo;

        public HomeController(ILogger<HomeController> logger, HotelInfoModel hotelInfo, HotelsML hotelsML)
        {
            _logger = logger;
            _hotelInfo = hotelInfo;
            _hotelsML = hotelsML;
        }

        public IActionResult Index()
        {
            //_hotelInfo = _hotelsML.Get(Id);
            //if (_hotelInfo == null || !_hotelInfo.IsActive)
            //    return View("~/Views/Home/ErrorPage.cshtml"); //goto error page
            //else
            //    return View(_hotelInfo);
            return View();
        }

        public IActionResult Privacy()
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
