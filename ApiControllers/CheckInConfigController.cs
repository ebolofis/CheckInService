using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CheckinBack.Models;
using CheckinBack.MainLogic;
using CheckinBack.Models;
using iTextSharp.text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CheckInService.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckInConfigController : ControllerBase
    {

        CheckInConfigHelper checkinModelsHelper;
        private SystemInfoModel sysinfo;
        private CheckInML checkinml;
        private HotelsML hotelsml;
 
        public CheckInConfigController(CheckInML checkin,
            SystemInfoModel systemInfo,
            HotelsML hotelsml,
            CheckInConfigHelper checkinModelsHelper)
        {
            this.checkinml = checkin;
            this.sysinfo = systemInfo;
            this.hotelsml = hotelsml;
            this.checkinModelsHelper = checkinModelsHelper;
            //  this._hostingEnvironment = host;
        }



    #region GET_CONFIGURATION_DATA
        [HttpGet, Route("GetPrivacyPolicyModel")]
        public IActionResult GetPrivacyPolicyModel(string hotelId)
        {
            PrivacyPolicyModel PrivacyModel = checkinModelsHelper.GetJsonPrivacyPolicy(hotelId);
            return Ok(PrivacyModel);
        }

        [HttpGet, Route("GetFormatsModel")]
        public IActionResult GetFormatsModel(string hotelId)
        {
            GlobalAttributesModel FormatModel = checkinModelsHelper.GetJsonFormats(hotelId);
            return Ok(FormatModel);
        }


        [HttpGet, Route("GetMessagesLanguageModel")]
        public IActionResult GetMessagesLanguageModel(string hotelId)
        {
            List<LanguagesMessagesModel> LangMsgModelList = checkinModelsHelper.GetJsonMessageLanguageConfig(hotelId);
            return Ok(LangMsgModelList);
        }

        [HttpGet, Route("GetConfigFormModel")]
        public IActionResult GetConfigFormModel(string hotelId)
        {
            ConfigurationFormModel configFormModel = checkinModelsHelper.GetJsonConfig(hotelId);
            return Ok(configFormModel);
        }

        [HttpGet, Route("GetConfigListModel")]
        public IActionResult GetConfigListModel(string hotelId)
        {
            List<ItemModel> FinalControlsModelList = checkinModelsHelper.GetFieldsConfigurationListModel(hotelId);
            return Ok(FinalControlsModelList);
        }

        [HttpGet, Route("GetLanguages")]
        public IActionResult GetLanguages(string hotelId)
        {
            List<LanguagesModel> res = checkinModelsHelper.GetLanguages(hotelId);
            return Ok(res);
        }

        

        [HttpGet, Route("GetBasicConfigInfo")]
        public IActionResult GetBasicConfigInfo()
        {
            BaseConfigModel res = checkinModelsHelper.GetBasicConfigInfo();
            return Ok(res);
        }

        [HttpGet, Route("GetHotelDirectory")]
        public IActionResult GetHotelDirectory(string hotelId)
        {
            List<UrlTemplateModel> res = checkinModelsHelper.GetHotelDirectory(hotelId);
            return Ok(res);
        }

        [HttpGet, Route("GetUrlTemplates")]
        public IActionResult GetUrlTemplates()
        {
            List<UrlTemplateModel> res = checkinModelsHelper.GetUrlTemplates();
            return Ok(res);
        }


        #endregion

        #region "SET_CONFIGURATION_DATA"

        [HttpPost, Route("SaveMessageLanguageConfig")]
        public IActionResult SaveJsonMessageLanguageConfig(PostApiModel<List<LanguagesMessagesModel>> postModel)
        {
            checkinModelsHelper.SaveJsonMessageLanguageConfig(postModel.HotelId, postModel.Model);
            return Ok();
        }

        [HttpPost, Route("SaveJsonFormats")]
        public IActionResult SaveJsonFormats(PostApiModel<GlobalAttributesModel> postModel)
        {
            checkinModelsHelper.SaveJsonFormats(postModel.HotelId, postModel.Model);
            return Ok();
        }

        [HttpPost, Route("SaveJsonPrivacyPolicy")]
        public IActionResult SaveJsonPrivacyPolicy(PostApiModel<PrivacyPolicyModel> postModel)
        {
            checkinModelsHelper.SaveJsonPrivacyPolicy(postModel.HotelId, postModel.Model);
            return Ok();
        }

        [HttpPost, Route("SaveJsonConfig")]
        public IActionResult SaveJsonConfig(PostApiModel<ConfigurationFormModel> postModel)
        {
            checkinModelsHelper.SaveJsonConfig(postModel.HotelId, postModel.Model);
            return Ok();
        }

        [HttpPost, Route("SaveLanguages")]
        public IActionResult SaveLanguages(PostApiModel<List<LanguagesModel>> postMode)
        {
            checkinModelsHelper.SaveLanguages(postMode.HotelId, postMode.Model);
            return Ok();
        }

        [HttpPost, Route("SaveHotelDirectory")]
        public IActionResult SaveHotelDirectory(PostApiModel<List<UrlTemplateModel>> postMode)
        {
            checkinModelsHelper.SaveHotelDirectory(postMode.HotelId, postMode.Model);
            return Ok();
        }



        #endregion

        /// <summary>
        /// Get main logo
        /// </summary>
        /// <param name="hotelId"></param>
        /// <returns></returns>
        [HttpGet, Route("GetLogo")]
        public IActionResult GetLogo(string hotelId)
        {
           // System.Drawing.Image logo = checkinModelsHelper.GetLogo(hotelId);
            return Ok(checkinModelsHelper.GetLogo(hotelId,LogoType.MainLogo));
        }

        /// <summary>
        /// set main logo
        /// </summary>
        /// <param name="postMode"></param>
        /// <returns></returns>
        [HttpPost, Route("SetLogo")]
        public ActionResult<string> SetLogo(PostApiModel<byte[]> postMode)
        {
           string logo= checkinModelsHelper.SetLogo(postMode.HotelId, postMode.Model, LogoType.MainLogo);
            return Ok(logo);
        }

        /// <summary>
        /// Get main logo
        /// </summary>
        /// <param name="hotelId"></param>
        /// <returns></returns>
        [HttpGet, Route("GetWalletLogo")]
        public IActionResult GetWalletLogo(string hotelId)
        {
            // System.Drawing.Image logo = checkinModelsHelper.GetLogo(hotelId);
            return Ok(checkinModelsHelper.GetLogo(hotelId, LogoType.WalletLogo));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="hotelId"></param>
        /// <returns></returns>
        [HttpGet, Route("GetWalletRetinaLogo")]
        public IActionResult GetWalletRetinaLogo(string hotelId)
        {
            // System.Drawing.Image logo = checkinModelsHelper.GetLogo(hotelId);
            return Ok(checkinModelsHelper.GetLogo(hotelId, LogoType.WalletRetinaLogo));
        }

        /// <summary>
        /// set main logo
        /// </summary>
        /// <param name="postMode"></param>
        /// <returns></returns>
        [HttpPost, Route("SetWalletLogo")]
        public ActionResult<string> SetWalletLogo(PostApiModel<byte[]> postMode)
        {
            string logo = checkinModelsHelper.SetLogo(postMode.HotelId, postMode.Model, LogoType.WalletLogo);
            return Ok(logo);
        }

        [HttpPost, Route("SetWalletRetinaLogo")]
        public ActionResult<string> SetWalletRetinaLogo(PostApiModel<byte[]> postMode)
        {
            string logo = checkinModelsHelper.SetLogo(postMode.HotelId, postMode.Model, LogoType.WalletRetinaLogo);
            return Ok(logo);
        }

    }

    //public class FIleUploadAPI
    //{
    //    public string HotelId { get; set; }
    //    public IFormFile files { get; set; }
    //}
}