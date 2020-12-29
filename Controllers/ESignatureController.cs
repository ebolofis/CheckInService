using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CheckinBack.Helpers.PdfCreate;
using CheckinBack.MainLogic;
using CheckinBack.Models;
using CheckinBack.Models;
using Microsoft.AspNetCore.Mvc;

namespace CheckInService.Controllers
{


    public class ESignatureController : Controller
    {
        CheckInConfigHelper checkInModelsHelper;
        HotelInfoModel hotelinfo = new HotelInfoModel();

        public ESignatureController(CheckInConfigHelper checkInModelsHelper)
        {
            this.checkInModelsHelper = checkInModelsHelper;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult SignatureLayout()
        {
            return View();
        }
        public IActionResult MitsisSignatureLayout()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetSettings(string hotelId)
        {
            GlobalAttributesModel FormatModel = new GlobalAttributesModel();
            PrivacyPolicyModel PrivacyModel = new PrivacyPolicyModel();
            ConfigurationFormModel configurationform = new ConfigurationFormModel();
            List<LanguagesMessagesModel> langmessages = new List<LanguagesMessagesModel>();

            langmessages = checkInModelsHelper.GetJsonMessageLanguageConfig(hotelId);
            PrivacyModel = checkInModelsHelper.GetJsonPrivacyPolicy(hotelId);
            FormatModel = checkInModelsHelper.GetJsonFormats(hotelId);
            ViewBag.Format = FormatModel;
            ViewBag.Privacy = PrivacyModel;
            ViewBag.ConfigurationForm = configurationform;
            ViewBag.langmessages = langmessages;
            ViewBag.hotelID = hotelId;

            if (FormatModel.selectedTemplate == "Template1")
            {
                return View("SignatureLayout");
            }
            else if (FormatModel.selectedTemplate == "Template2")
            {
                return View("MitsisSignatureLayout");
            }
            else if (FormatModel.selectedTemplate == "Custom")
            {
                return View("CustomSignatureLayout");
            }
            else
            {
                return View("test");
            }
        }
    }
}