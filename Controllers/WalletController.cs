using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using CheckinBack.InMemoryDB;
using CheckinBack.MainLogic;
using CheckinBack.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CheckInService.Controllers
{

    public class WalletController : Controller
    {
        HotelsML _hotelsML;
        MainActionsML _mainActML;
        WebApiClientHelper _webHlp = new WebApiClientHelper();
        ILogger<WalletController> _logger;
        private SystemInfoModel sysinfo;
        //private readonly InMemoryDbHotelConHist inMemDbConHist;
        public WalletController(HotelsML _hotelsML, MainActionsML _mainActML, ILogger<WalletController> logger, WebApiClientHelper webHlp, SystemInfoModel sysinfo/*, InMemoryDbHotelConHist inMemDbConHist*/)
        {
            this._logger = logger;
            this._webHlp = webHlp;
            this._hotelsML = _hotelsML;
            this._mainActML = _mainActML;
            this.sysinfo = sysinfo;
            //this.inMemDbConHist = inMemDbConHist;
        }


        public IActionResult Index(string h, string str)
        {
            ViewBag.HotelId = h;
            ViewBag.String1 = str;
            ViewBag.Buchnr = "";
            ViewBag.Room = "";
            ViewBag.kdnr = "";
            PassbookModel passbook = null;
            try
            {
                passbook = _mainActML.GetPassBookModelFromWalletCall(str, h);

                if (passbook == null || passbook.FastCheckInExtModel == null || passbook.FastCheckInExtModel.FormFastCheckInModelList == null || passbook.FastCheckInExtModel.FormFastCheckInModelList[0].buchstatus == 2) { passbook = null; }   //canceled
                if (passbook != null)
                {
                    ViewBag.Buchnr = passbook.FastCheckInExtModel.FormFastCheckInModelList[0].Buchnr;
                    ViewBag.Room   = passbook.FastCheckInExtModel.FormFastCheckInModelList[0].Room;
                    ViewBag.kdnr      = passbook.FastCheckInExtModel.FormFastCheckInModelList[0].kdnr;

                    string post_url = sysinfo.PassbookURLInternal + "api/ProtelPost/PostModelForWallt";
                    try
                    {
                        HttpResponseMessage res = _webHlp.Post(post_url, passbook);
                    }
                    catch (Exception ex)
                    {
                        // inMemDbConHist.AddLogEntryAsync(h, new LoggingModel(ex, $"ERROR Posting Customer Data to Passbook Service. String1: {(str ?? "<null>")}", "", DBErrorLevel.Error, passbook));
                        _logger.LogError($"ERROR Post Model From Mobile to Passbook for HotelId: {h}, String1: {(str ?? "<null>")}. : {ex}");
                    }
                }
            }
            catch (Exception ex) {
                _logger.LogError($"ERROR Post Model From Mobile to Passbook for HotelId: {h}, String1: {(str ?? "<null>")}. : {ex}");
            }

            return View(passbook);
        }


    }
}