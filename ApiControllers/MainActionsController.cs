using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using CheckinBack.DataAccess;
using CheckinBack.Models;
using CheckinBack.MainLogic;
//using CheckinBack.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AutoMapper.Configuration;
using Microsoft.AspNetCore.Hosting;
using HiQPdf;
//using Microsoft.AspNetCore.SignalR;
using CheckinFront.SignalR;
using Microsoft.AspNetCore.SignalR;
using System.Text.Json;
using System.Text.Encodings.Web;
using CheckinFront.Models;
using CheckinBack.InMemoryDB;

namespace CheckinFront.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MainActionsController : ControllerBase
    {
        ILogger<MainActionsController> logger;
        private readonly MainActionsML mainActionsML;
        private readonly IHubContext<SignalRHub> _hubContext;
        

        /// <summary>
        /// Instance to HotelsML
        /// </summary>
        private readonly HotelsML hotelML;

        CheckDigitHelper checkDigitHelper;
        public MainActionsController(ILogger<MainActionsController> _logger, MainActionsML mainActionsML, CheckDigitHelper _checkDigitHelper, IHubContext<SignalRHub> hubContext, HotelsML _hotelML)
        {
            this.logger = _logger;
            _hubContext = hubContext;
            this.mainActionsML = mainActionsML;
            this.checkDigitHelper = _checkDigitHelper;
            hotelML = _hotelML;
        }

        /// <summary>
        /// Post Protel Data to Api and Update Dictionary.
        /// </summary>
        /// <param name="model">ProtelPostModel</param>
        [HttpPost("PostFromProtel")]
        public async Task<IActionResult> PostFromProtel(ProtelPostModel model)
        {
            string String1 = mainActionsML.PostFromProtel(model);
            string String1Encrypted = checkDigitHelper.CreateValueCD(String1);
            await _hubContext.Clients.Group(model.Group).SendAsync("ReceiveMessage", String1, String1Encrypted);
            return Ok();
        }

        /// <summary>
        /// Get FastCheckInExtModel From Dictionary.
        /// </summary>
        /// <param name="HotelId"></param>
        /// <param name="String1"></param>
        /// <returns>List FastCheckInExtModel</returns>
        [HttpGet("GetFromMobile/{HotelId}/{String1}")]
        public async Task<IActionResult> GetFromMobileAsync(string HotelId, string String1)
        {
            int tm=20;//in min.
            FastCheckInExtModel model = await mainActionsML.GetAll(HotelId, String1);
            if (model != null)
            {
                if (model.Mode == GroupModeEnum.Classic)
                {
                    TimeSpan timeDiff = DateTime.Now.Subtract(model.FormFastCheckInModelList[0].CreateDate);
                    if (timeDiff.TotalMinutes > tm)
                    {
                        model = null;
                    }
                }
                else if (model.Mode == GroupModeEnum.Contactless && string.IsNullOrWhiteSpace(model.Group) && !string.IsNullOrWhiteSpace(model.String1))
                {
                    TimeSpan timeDiff = model.FormFastCheckInModelList[0].CreateDate.Subtract(DateTime.Now);
                    if (timeDiff.TotalMinutes > tm)
                    {
                        model = null;
                    }
                }
            }
            return Ok(model);
        }

        /// <summary>
        /// Get Data From Dictionary for Specific Group.
        /// </summary>        /// <param name="HotelId"></param>
        /// <param name="Group"></param>
        /// <returns></returns>
        [HttpGet("GetFromDictionary/{HotelId}/{Group}")]
        public async Task<IActionResult> GetFromDictionaryAsync(string HotelId, string Group)
        {
            GetFromDictModel model = await mainActionsML.GetFromDictionary(HotelId, Group);
            return Ok(model);
        }



        /// <summary>
        /// Post FastCheckInExtModel to Protel. It is called when customer has already sign and finised process.
        /// </summary>
        /// <param name="model">FastCheckInExtModel</param>
        [HttpPost("PostFromMobile")]
        public async Task<IActionResult> PostFromMobile([FromForm]FastCheckInExtModel model, [FromServices]InMemoryDbHotelConHist inMemDbConHist, [FromServices] HotelsML hotelsML)//Task<IActionResult>
        {
            if (model == null)
            {
                string str = "Posted no Customer. Customer Model (FastCheckInExtModel) is empty";
                logger.LogWarning(str);
                inMemDbConHist.AddLogEntryAsync(model.HotelId, new LoggingModel(str, DBErrorLevel.Warning));
                throw new Exception("Incorrect Data");
            }
            //1. Get Hotel Info
            HotelInfoModel hotel = hotelsML.Get(model.HotelId);
            if (hotel == null) return null;

            _ = Task.Run(() => mainActionsML.PostFromMobile(model, hotel));
            // mainActionsML.PostFromMobile(model, hotel);

            Task.Delay(100).Wait();
            return Ok(true);
        }


        /// <summary>
        /// Get Data From Protel Serveice and Post Them to Checkin Passbook .
        /// </summary>
        /// <param name="HotelId"></param>
        /// <param name="Buchnr"></param>
        /// <returns></returns>
        [HttpGet("GetFromProtelService/{HotelId}/{Buchnr}")]
        public IActionResult GetFromProtelService(string HotelId, int Buchnr)
        {
            mainActionsML.GetFromProtelService(HotelId, Buchnr);
            return Ok();
        }

        /// <summary>
        ///Delete From Dictionary.
        /// </summary>
        /// <param name="HotelId"></param>
        /// <param name="Group"></param>
        /// <returns></returns>
        [HttpGet("Delete/{HotelId}/{String1}")]
        public IActionResult Delete(string HotelId, string String1)
        {
            mainActionsML.DeleteAsync(HotelId, String1);
            return Ok();
        }

        /// <summary>
        /// Gets a list of persoins calls from protel
        /// </summary>
        /// <param name="HotelId">Hotel Id from checkinservice table</param>
        /// <param name="LanguangeId">Languange id to get data</param>
        /// <returns></returns>
        [HttpGet("GetProtelAnrede/{HotelId}/{LanguangeId}")]
        public IActionResult GetProtelAnrede(string HotelId, int LanguangeId)
        {
            List<ProtelAnredeModel> result =  mainActionsML.GetAnredeList(HotelId, LanguangeId);
            return Ok(result);
        }

        [HttpPost("GetReservationStatus")]
        /// <summary>
        /// Returns buch status (0=> confirmed, 1=> checkin, 2=> checkout) for a given model 
        /// based on string1 or on arrival, departure and roomid
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public IActionResult GetReservationStatus(CallReservationStatusModel parameters)
        {
            int result = mainActionsML.GetReservationStatus(parameters);
            return Ok(result);
        }

        [HttpPost("GetHotelsByProtelApi")]
        public IActionResult GetHotelsByProtelApi(GetHotelsByProtelApiModel parameters)
        {
            List<HotelInfoModel> model = hotelML.GetHotelsByProtelApi(parameters.protelApi);
            return Ok(model);
        }

        [HttpGet("CheckinTimeout/{hotelId}/{string1}/{group}")]
        public IActionResult CheckinTimeout(string hotelId, string string1,string group="")
        {
            hotelML.CheckinTimeout(hotelId, string1, group);
            return Ok();
        }

        [HttpPost("ClientError")]
        public IActionResult ClientError([FromForm]ClentErrorModel model)
        {
            hotelML.ClientError(model);
            return Ok();
        }

        /// <summary>
        /// On checkInPassbook service if httpGet method named GenerateWallet 
        /// cannot find a model on list then calls this method for specific string1 and hotel
        /// to regenerate a PassbookModel and send it to checkInPassbook service to create wallet
        /// </summary>
        /// <param name="string1"></param>
        /// <param name="hotelId"></param>
        /// <returns></returns>
        [HttpGet("GetPassBookForWallet/{string1}/{hotelId}")]
        public IActionResult GetPassBookForWallet(string string1, string hotelId)
        {
            PassbookModel result = mainActionsML.GetPassBookModelFromWalletCall(string1, hotelId);
            return Ok(result); ;
        }
    }
}