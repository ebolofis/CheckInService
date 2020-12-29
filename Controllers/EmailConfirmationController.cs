using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CheckinBack.MainLogic;
using CheckinBack.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CheckInService.Controllers
{
    public class EmailConfirmationController : Controller
    {
        private readonly HotelsML hotelsML;
        private readonly MainActionsML mainActionsML;
        private readonly CheckInML CheckInML;
        private readonly ILogger<EmailConfirmationController> logger;
        public EmailConfirmationController(HotelsML _hotelsML, MainActionsML _mainActionsML, CheckInML _CheckInML, ILogger<EmailConfirmationController> _logger)
        {
            this.hotelsML = _hotelsML;
            this.mainActionsML = _mainActionsML;
            this.CheckInML = _CheckInML;
            this.logger = _logger;
        }

        public IActionResult Index(string h, string k)
        {
            ViewBag.Title = "Email-Confirmation";
            ViewBag.HotelId = h;
            ViewBag.ReservationId = null;
           bool res = CheckInML.VerifyEmail(h, k);
            ViewBag.result = res;
            return View("EmailConfirmation");

        }

     
    }
}