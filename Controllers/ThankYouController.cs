using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using CheckinBack.Models;
using CheckinBack.InMemoryDB;
using CheckinBack.MainLogic;
using CheckinBack.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NLog;

namespace CheckInService.Controllers.Api
{
    public class ThankYouController : Controller
    {
        CheckInConfigHelper retrieveModels;
        MainActionsML _mainactionsml;
        ILogger<ThankYouController> _logger;
        private static readonly HttpClient HttpClient = new HttpClient();
        private readonly InMemoryDbHotelConHist inMemDbConHist;

        public ThankYouController(CheckInConfigHelper checkInModelsHelper, MainActionsML mainactionsml, ILogger<ThankYouController> logger, InMemoryDbHotelConHist inMemDbConHist)
        {
            retrieveModels = checkInModelsHelper;
            _mainactionsml = mainactionsml;
            this.inMemDbConHist = inMemDbConHist; 
            _logger = logger;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetPassbookAsync(string string1, int buchnr, string room, int kdnr, string hotelId)
        {
            string file = null;
           
            try
            {
                file = string1 + "_" + kdnr + ".pkpass";
                string GetPassBookURL = _mainactionsml.GetPassBookURL() + "api/ProtelPost/GenerateWallet?string1=" + string1 + "&buchnr=" + buchnr + "&room=" + room + "&kdnr=" + kdnr + "&hotelId=" + hotelId;
               _logger.LogInformation($"Creating Wallet file {file} for HotelId {hotelId} ...");
                using (var response = await HttpClient.GetAsync(GetPassBookURL))
                {
                    ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    if (!response.IsSuccessStatusCode)
                    {
                        string err = $"Passbook Service returned code {response.StatusCode}.  Provided string1:'{string1}', buchnr:'{buchnr}', room:'{room}', kdnr:'{kdnr}' ";
                        inMemDbConHist.AddLogEntryAsync(hotelId, new LoggingModel(err, DBErrorLevel.Error));
                        throw new Exception(err);
                    }
                    var responseContent = await response.Content.ReadAsStringAsync();
                    
                    byte[] deserializedResponse = JsonSerializer.Deserialize<byte[]>(responseContent);
                    int length = (deserializedResponse!=null) ? deserializedResponse.Length : 0;
                    string mess = null;
                    if (length <= 50)
                    {
                        mess = $"Wallet File '{file}' created with SMALL SIZE. File size: {deserializedResponse.Length}. Provided string1:'{string1}', buchnr:'{buchnr}', room:'{room}', kdnr:'{kdnr}' ";
                        inMemDbConHist.AddLogEntryAsync(hotelId, new LoggingModel(mess, DBErrorLevel.Warning));
                        _logger.LogWarning(mess+ $", hotelId {hotelId}");
                    }
                       
                    else
                    {
                        mess = $"Wallet File '{file}' Created. File size: {deserializedResponse.Length}. Provided string1:'{string1}', buchnr:'{buchnr}', room:'{room}', kdnr:'{kdnr}' ";
                       inMemDbConHist.AddLogEntryAsync(hotelId, new LoggingModel(mess, DBErrorLevel.Info));
                        _logger.LogInformation(mess + $", hotelId {hotelId}");
                    }
                        
                    
                    return File(deserializedResponse, "application/vnd.apple.pkpass", file);
                }
            }
            catch (Exception error)
            {
                _logger.LogError(Convert.ToString(error));
                inMemDbConHist.AddLogEntryAsync(hotelId, new LoggingModel(error, $"Error Creating Wallet file {file}. Provided string1:'{string1}', buchnr:'{buchnr}', room:'{room}', kdnr:'{kdnr}' ", "", DBErrorLevel.Error));
                return RedirectToAction("barcode", "Precheckin", new { h= hotelId });
            }
        }

        public ActionResult ThankYouPageMitsis()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetSettings(string hotelId)
        {
            GlobalAttributesModel FormatModel = retrieveModels.GetJsonFormats(hotelId);
            ConfigurationFormModel configurationform = new ConfigurationFormModel();
            ViewBag.Format = FormatModel;
            ViewBag.ConfigurationForm = configurationform;

            MainActionsML mainActionsML = _mainactionsml;
            ViewBag.PassbookURL = mainActionsML.GetPassBookURL();

            if (FormatModel.selectedTemplate == "Template1")
            {
                return View("ThankYouPageTemplate1");
            }
            else if (FormatModel.selectedTemplate == "Template2")
            {
                return View("ThankYouPageMitsis");
            }
            else if (FormatModel.selectedTemplate == "Custom")
            {
                return View("ThankYouPageCustom");
            }
            else
            {
                return View("test");
            }
        }
    }
}