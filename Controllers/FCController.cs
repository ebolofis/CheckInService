using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Threading.Tasks;
using CheckinBack.Models;
using CheckinBack.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NLog;
using NLog.Fluent;
using System.Text.Json;
using Microsoft.AspNetCore.SignalR;
using CheckinFront.SignalR;
using System.Threading;
using CheckinBack.MainLogic;

namespace CheckInService.Controllers
{
    public class FCController : Controller
    {
        CheckInConfigHelper checkInModelsHelper;
        CheckDigitHelper checkDigitHelper;
        List<ItemModel> modelList = new List<ItemModel>();
        ILogger<FCController> logger;
        private readonly IHubContext<SignalRHub> _hubContext;
        private static readonly HttpClient HttpClient = new HttpClient();
        private readonly HotelsML hotelsML;
        private readonly MainActionsML mainActionsML;
        private SystemInfoModel sysinfo;

        protected readonly ILogger<FCController> retrieve_logger;
        public FCController(HotelsML _hotelsML, ILogger<FCController> log, CheckInConfigHelper checkInModelsHelper, CheckDigitHelper checkDigitHelper, MainActionsML mainActionsML, SystemInfoModel sysinfo, IHubContext<SignalRHub> hubContext)
        {
            this.hotelsML = _hotelsML;
            this.logger = log;
            this.checkInModelsHelper = checkInModelsHelper;
            this.checkDigitHelper = checkDigitHelper;
            this._hubContext = hubContext;
            this.mainActionsML = mainActionsML;
            this.sysinfo = sysinfo;
        }
        public IActionResult Home()
        {
            FastCheckInModel model = new FastCheckInModel();
            return View("Template1", model);
        }
        public IActionResult Template2()
        {
            FastCheckInModel model = new FastCheckInModel();
            return View("Template2", model);
        }
        public IActionResult ThankYouPageMitsis()
        {
            return View("ThankYouPageMitsis");
        }

        [HttpGet]
        public IActionResult GetSettings(string u, string g, string h)
        {
            hotelsML.Get(h);
            string hotelId = h; //hotelname as per the query parameter, of the APK it represents the Unique Hotel ID
            GlobalAttributesModel FormatModel = new GlobalAttributesModel();
            PrivacyPolicyModel PrivacyModel = new PrivacyPolicyModel();
            SettingsModel settings = new SettingsModel() { url = u, grpname = g, hotelname = hotelId };
            ConfigurationFormModel configurationform = new ConfigurationFormModel();
            List<LanguagesMessagesModel> langmessages = new List<LanguagesMessagesModel>();
            langmessages = checkInModelsHelper.GetJsonMessageLanguageConfig(hotelId);
            modelList = checkInModelsHelper.GetFieldsConfigurationListModel(hotelId);
            modelList = modelList.OrderByDescending(x =>x.IsVisible).ThenBy(y=>y.OrderField).ToList();
            PrivacyModel = checkInModelsHelper.GetJsonPrivacyPolicy(hotelId);
            FormatModel = checkInModelsHelper.GetJsonFormats(hotelId);
            ViewBag.Config = settings;
            ViewBag.Format = FormatModel;
            ViewBag.Privacy = PrivacyModel;
            ViewBag.ConfigurationForm = configurationform;
            ViewBag.langmessages = langmessages;
           
            if (FormatModel.selectedTemplate == "Template1")
            {
                return View("Template1");
            }
            else if (FormatModel.selectedTemplate == "Template2")
            {
                ViewBag.MainConfig = settings;
                return View("Template2");
            }
            else if (FormatModel.selectedTemplate == "Custom")
            {
                return View("Custom", modelList);
            }
            else
                return View("test");
        }

        [HttpGet]
        public IActionResult redirect(string u, string str, string h) //string1
        {
            hotelsML.Get(h);
            string hotelId = h; //hotelname as per the query parameter, of the APK it represents the Unique Hotel ID
            GlobalAttributesModel FormatModel = new GlobalAttributesModel();
            PrivacyPolicyModel PrivacyModel = new PrivacyPolicyModel();
            SettingsModel settings = new SettingsModel() { url = u, grpname = "", hotelname = hotelId };
            ConfigurationFormModel configurationform = new ConfigurationFormModel();
            List<LanguagesMessagesModel> langmessages = new List<LanguagesMessagesModel>();
            langmessages = checkInModelsHelper.GetJsonMessageLanguageConfig(hotelId);
            modelList = checkInModelsHelper.GetFieldsConfigurationListModel(hotelId);
            modelList = modelList.OrderByDescending(x => x.IsVisible).ThenBy(y => y.OrderField).ToList();

            List<CheckedBoxItemModel> test = new List<CheckedBoxItemModel>();

            PrivacyModel = checkInModelsHelper.GetJsonPrivacyPolicy(hotelId);
            FormatModel = checkInModelsHelper.GetJsonFormats(hotelId);
            string string1Decrypted = checkDigitHelper.CreateInitValue(str);
            ViewBag.Config = settings;
            ViewBag.Format = FormatModel;
            ViewBag.Privacy = PrivacyModel;
            ViewBag.ConfigurationForm = configurationform;
            ViewBag.langmessages = langmessages;
            ViewBag.EncryptedString = str;
            ViewBag.DecryptedString = string1Decrypted;

            if (FormatModel.selectedTemplate == "Template1")
            {
                return View("Template1");
            }
            else if (FormatModel.selectedTemplate == "Template2")
            {
                ViewBag.MainConfig = settings;
                return View("Template2");
            }
            else if (FormatModel.selectedTemplate == "Custom")
            {
                foreach (ItemModel mod in modelList)
                {
                    mod.Width = 100;
                }
                return View("Custom", modelList);
            }
            else
                return View("test");
        }

        public ImageLogoModel GetHotelLogo(string HotelId)
        {
            ImageLogoModel imageModel = new ImageLogoModel();
            byte[] Logo = null;
            try
            {
                Logo = checkInModelsHelper.GetLogo(HotelId, LogoType.MainLogo);
                imageModel.Logo = Convert.ToBase64String(Logo);
            }
            catch (Exception ex)
            {
                logger.LogError($"ERROR getting Hotel Logo for HotelId: " + HotelId + " -->" + ex.ToString());
                imageModel = null;
            }
            return imageModel;
        }

        public async Task<GetFromDictModel> GetFromDictionaryAsync(string HotelId, string Group)
        {
            GetFromDictModel model = null;
            try
            {
                model = await mainActionsML.GetFromDictionary(HotelId, Group);
            }
            catch (Exception ex)
            {
                logger.LogError("ERROR Getting Data From Main Dictionary: " + ex.ToString());
            }
            return model;
        }

        public SignalRControllerModel GetSignalRConfiguration()
        {
            SignalRControllerModel signalRModel = new SignalRControllerModel();
            try
            {
                signalRModel.IsEnabled = sysinfo.SignalRController.IsEnabled;
                signalRModel.Threashold1 = sysinfo.SignalRController.Threashold1;
                signalRModel.Interval1 = sysinfo.SignalRController.Interval1;
                signalRModel.Threashold2 = sysinfo.SignalRController.Threashold2;
                signalRModel.Interval2 = sysinfo.SignalRController.Interval2;
            }
            catch (Exception ex)
            {
                logger.LogError($"ERROR getting signalRModel from System Info: " + ex.ToString());
                signalRModel = null;
            }
            return signalRModel;
        }

        public class SettingsModel
        {
            public string url { get; set; }
            public string grpname { get; set; }
            public string hotelname { get; set; }
            public string template { get; set; }
        }

    }
}