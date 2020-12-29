using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CheckinBack.DataAccess;
using CheckinBack.Models;
using CheckinBack.InMemoryDB;
using CheckinBack.MainLogic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NLog;

namespace CheckinFront.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelsController : ControllerBase
    {
        private readonly HotelsML hotelsML;
        private readonly SystemInfoHelper systemInfoHelper;
        private readonly SystemInfoModel systemInfoModel;
        private readonly ILogger<HotelsController> logger;
        private readonly ProtelPmsDB ProtelPmsDB;
        private readonly InMemoryConfigReadHelper inMemoryConfigReadHelper;

        public HotelsController(HotelsML hotelsML,
            SystemInfoHelper systemInfoHelper,
            SystemInfoModel systemInfoModel,
            ILogger<HotelsController> logger,
           ProtelPmsDB ProtelPmsDB,
           InMemoryConfigReadHelper inMemoryConfigReadHelper)
        {
            this.hotelsML = hotelsML;
            this.systemInfoHelper = systemInfoHelper;
            this.systemInfoModel = systemInfoModel;
            this.logger = logger;
            this.ProtelPmsDB = ProtelPmsDB;
            this.inMemoryConfigReadHelper = inMemoryConfigReadHelper;
        }

        [HttpGet("GetList/{BOMinVersion}")]
        [HttpGet("GetList")]
        public ActionResult<List<HotelInfoModel>> GetList(string BOMinVersion="0.0.0.1")
        {
            //1. check BO Version
            Version vparam;
            try
            {
                 vparam = new Version(BOMinVersion);

            }catch(Exception ex)
            {
                logger.LogError(ex.ToString());
                throw new BussinessException("Invalid Client Version");
            }
           
            Version vmin = new Version(systemInfoModel.BOMinVersion);
            if (vparam.CompareTo(vmin) < 0)
            {
                if(BOMinVersion!= "0.0.0.1")
                    throw new BussinessException($"Back Office version {BOMinVersion} is Obsolete. Please use the Version {systemInfoModel.BOMinVersion} or newer Version.");
                else
                    throw new BussinessException($"Back Office version is Obsolete. Please use the Version {systemInfoModel.BOMinVersion} or newer Version.");
            }

            //2. get data
           return hotelsML.GetAll();
        }

        [HttpPost("Insert")]
        public ActionResult<HotelInfoModel> Insert(HotelInfoModel model)
        {
            return hotelsML.Insert(model);
        }

        [HttpPost("Update")]
        public ActionResult Update(HotelInfoModel model)
        {
            hotelsML.Update(model);
            return Ok();
        }

        [HttpGet("Delete/{Id}")]
        public ActionResult Delete(string Id, [FromServices]InMemoryPdfErrorCounter InMemoryPdfErrorCounter, [FromServices] InMemorySqlErrorCounter InMemorySqlErrorCounter)
        {
            hotelsML.Delete(Id, InMemoryPdfErrorCounter, InMemorySqlErrorCounter);
            return Ok();
        }

        /// <summary>
        /// Signal Services to re-read  config files
        /// </summary>
        /// <returns></returns>
        [HttpGet("ReConfig")]
        public ActionResult ReConfig()
        {
            try
            {
                //1. Delete all Service Names from In-Memory DB
                inMemoryConfigReadHelper.DeleteServicesAsync();
                //2. Current Service re-reads config files. (The rest of the Services will check their service name in ProtelPmsDB.GetModelFromProtel)
                systemInfoHelper.LoadConfig();
                return Ok();
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
                throw new BussinessException("Configuration did not update");
            }
            
        }

        /// <summary>
        /// Reset Hotel's in memory lists
        /// </summary>
        /// <param name="hotelId"></param>
        /// <param name="inMemHashHotelInfo"></param>
        /// <param name="inMemHashHotelLogo"></param>
        /// <param name="inMemHashHotelJson"></param>
        /// <returns></returns>
        [HttpGet("ResetData/{hotelId}")]
        public ActionResult ResetData(string hotelId, 
           [FromServices] InMemoryHashHelper<HotelInfoModel> inMemHashHotelInfo,
           [FromServices] InMemoryHashHelper<HotelLogoModel> inMemHashHotelLogo,
           [FromServices] InMemoryHashHelper<HotelJsonModel> inMemHashHotelJson)
        {
            ProtelPmsDB.ResetInMemoryDB(hotelId, inMemHashHotelInfo, inMemHashHotelLogo, inMemHashHotelJson);
            return Ok();
        }

        /// <summary>
        /// reset in memory logs
        /// </summary>
        /// <param name="hotelId"></param>
        /// <returns></returns>
        [HttpGet("ResetLog/{hotelId}")]
        public ActionResult ResetLog(string hotelId)
        {
            ProtelPmsDB.ResetLog(hotelId);
            return Ok();
        }


        /// <summary>
        /// Return the list of error counters for a specific hotel: 
        /// List[0]=PDFErrorCounter, List[1]=SqlErrorCounter
        /// </summary>
        /// <param name="hotelId"></param>
        /// <returns></returns>
        [HttpGet("GetErrorcounters/{hotelId}")]
        public ActionResult<Dictionary<string,int>> GetErrorCounters(string hotelId, [FromServices]InMemoryPdfErrorCounter InMemoryPdfErrorCounter, [FromServices] InMemorySqlErrorCounter InMemorySqlErrorCounter)
        {
            Dictionary<string, int> list = new Dictionary<string, int>();
            list.Add("PDF Error Counter", InMemoryPdfErrorCounter.GetErrorCounter(hotelId));
            list.Add("SQL Error Counter", InMemorySqlErrorCounter.GetErrorCounter(hotelId));
            return Ok(list);
        }


    }
}