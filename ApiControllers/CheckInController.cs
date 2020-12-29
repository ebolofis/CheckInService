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
using CheckinBack.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AutoMapper.Configuration;
using Microsoft.AspNetCore.Hosting;
using HiQPdf;
using CheckInService.Models;
using System.Text.Json;
using System.Text;
using System.Threading;
using CheckinBack.InMemoryDB;
using System.Net.Sockets;
using System.Runtime.CompilerServices;

namespace CheckinFront.Controllers
{
    [Route("api/Sign")]
    [ApiController]
    public class CheckInController : ControllerBase
    {
        protected readonly ILogger<CheckInController> logger;
        // private readonly InMemoryDbHotelConHist inMemDbConHist;

        CheckInConfigHelper checkinModelsHelper;
        ProtelPmsDB dt;
        InMemoryDBHelper inMemoryDBHelper;

        private SystemInfoModel sysinfo;
        private CheckInML checkinml;
        private HotelsML hotelsml;
        private readonly InMemoryMainLogging inMemLog;

        //const string pdfSerial = "YioLMzIG-BC4LABAD-EBtTU0xS-QlNCUEJW-W1ZXQlFT-TFNQTFtb-W1s=";

        #region CHECKIN_CONTROLLER_CONSTRUCTOR
        //   private readonly IHostingEnvironment _hostingEnvironment;
        public CheckInController(CheckInML checkin,
            ILogger<CheckInController> log,
            SystemInfoModel systemInfo,
            HotelsML hotelsml,
            CheckInConfigHelper checkinModelsHelper,
            ProtelPmsDB dt,
            InMemoryDBHelper _inMemoryDBHelper,
            InMemoryMainLogging inMemLog)
        {
            this.checkinml = checkin;
            this.logger = log;
            this.sysinfo = systemInfo;
            this.hotelsml = hotelsml;
            this.checkinModelsHelper = checkinModelsHelper;
            this.dt = dt;
            this.inMemoryDBHelper = _inMemoryDBHelper;
            this.inMemLog = inMemLog;
        }
        #endregion

        #region GET_CONFIGURATION_DATA
        [HttpGet, Route("GetPrivacyPolicyModel/{hotelID}")]
        public IActionResult GetPrivacyPolicyModel(string hotelId)
        {
            PrivacyPolicyModel PrivacyModel = checkinModelsHelper.GetJsonPrivacyPolicy(hotelId);
            return Ok(PrivacyModel);
        }

        [HttpGet, Route("GetFormatsModel/{hotelID}")]
        public IActionResult GetFormatsModel(string hotelId)
        {
            GlobalAttributesModel FormatModel = checkinModelsHelper.GetJsonFormats(hotelId);
            return Ok(FormatModel);
        }


        [HttpGet, Route("GetMessagesLanguageModel/{hotelID}")]
        public IActionResult GetMessagesLanguageModel(string hotelId)
        {
            List<LanguagesMessagesModel> LangMsgModelList = checkinModelsHelper.GetJsonMessageLanguageConfig(hotelId);
            return Ok(LangMsgModelList);
        }

        [HttpGet, Route("GetConfigFormModel/{hotelID}")]
        public IActionResult GetConfigFormModel(string hotelId)
        {
            ConfigurationFormModel configFormModel = checkinModelsHelper.GetJsonConfig(hotelId);
            return Ok(configFormModel);
        }

        [HttpGet, Route("GetConfigListModel/{hotelID}")]
        public IActionResult GetConfigListModel(string hotelId)
        {
            List<ItemModel> FinalControlsModelList = checkinModelsHelper.GetFieldsConfigurationListModel(hotelId);
            return Ok(FinalControlsModelList);
        }
        #endregion

        #region GETPROTELDATA

        [HttpGet, Route("GetNationalities/{hotelID}")]
        public IActionResult GetNationalities(string hotelID)
        {

            List<NationalitiesModel> model;
            try
            {
                model = checkinml.GetNationalities(hotelID);
            }
            catch (BussinessException bex)
            {
                return BadRequest(bex.Message);
            }
            catch (Exception ex)
            {
                logger.LogError($"Cannot get nationalities from PMS {hotelID} : " + ex.ToString());
                return BadRequest(ex.Message);
            }
            return Ok(model);
        }

        [HttpGet, Route("GetLanguages/{hotelID}")]
        public IActionResult GetLanguages(string hotelID)
        {
            List<LanguagesModel> model = null;
            try
            {
                model = checkinml.GetLanguages(hotelID);
            }
            catch (BussinessException bex)
            {
                return BadRequest(bex.Message);
            }
            catch (Exception ex)
            {
                logger.LogError($"Cannot get Languages from PROTEL {hotelID} : " + ex.ToString());
                return BadRequest(ex.Message);
            }

            return Ok(model);
        }


        [HttpPost, Route("AuthenticatePassword")]
        public IActionResult AuthenticatePassword(PasswordModel passModel)
        {
            bool res = false;
            try
            {
                if (sysinfo.ApkPassword == passModel.Password)
                {
                    res = true;
                }
            }
            catch (Exception ex)
            {
                logger.LogError("Cannot Authenticate User : " + ex.ToString());
                return BadRequest(ex.Message);
            }
            return Ok(res);
        }

        [HttpGet, Route("GetMethodOfPayments/{hotelID}")]
        public IActionResult GetMethodOfPayments(string hotelID)
        {
            List<MethodOfPaymentsModel> model;
            try
            {
                model = checkinml.GetMethodOfPayments(hotelID);
            }
            catch (BussinessException bex)
            {
                return BadRequest(bex.Message);
            }
            catch (Exception ex)
            {
                logger.LogError($"Cannot get method of payments from PMS {hotelID} : " + ex.ToString());
                return BadRequest(ex.Message);
            }
            return Ok(model);
        }

        #endregion
    }
}