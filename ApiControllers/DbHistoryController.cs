using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CheckinBack.InMemoryDB;
using CheckinBack.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CheckInService.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DbHistoryController : ControllerBase
    {
        private readonly InMemoryDbHotelConHist inMemDbConHist;
        private readonly InMemoryMainLogging inMemLog;
        private readonly SystemInfoModel systemInfo;

        public DbHistoryController(InMemoryDbHotelConHist inMemDbConHist, InMemoryMainLogging inMemLog, SystemInfoModel systemInfo)
        {
            this.inMemDbConHist = inMemDbConHist;
            this.inMemLog = inMemLog;
            this.systemInfo = systemInfo;
        }

        [HttpGet("Get/{hotelId}")]
        public ActionResult<DbHotelConHistModel> GetHistory(string hotelId)
        {
            return inMemDbConHist.GetDbHistory(hotelId);
        }

        [HttpGet("GetMain")]
        public ActionResult<DbHotelConHistModel> GetMainLogging()
        {
            return inMemLog.GetDbHistory();
        }

        [HttpGet("Reset")]
        public ActionResult ResetHistory()
        {
            inMemLog.RemoveKeysAsync();
            inMemLog.AddLogEntryAsync(new LoggingModel("Service Logging Reset", DBErrorLevel.Info));
              return Ok();
        }

        /// <summary>
        /// Set the in-memory min logging level
        /// </summary>
        /// <param name="level"></param>
        /// <param name="inMemoryDB"></param>
        /// <returns></returns>
        [HttpGet("LoggingLevel/{level}")]
        public ActionResult LoggingLevel(string level,[FromServices] InMemoryDBHelper inMemoryDB)
        {
            
            string oldlevel = inMemoryDB.GetMinLogLevel();
            if (oldlevel != level)
            {
                
                inMemoryDB.SetMinLogLevell(level);
                systemInfo.ConfigTime = DateTime.Now;
                inMemLog.AddLogEntryAsync(new LoggingModel($"In Memory Min Logging Level changed from {oldlevel} to {level}", DBErrorLevel.Warning));
            }
         
            return Ok();
        }

        /// <summary>
        /// Get the in-memory min logging level
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetLoggingLevel")]
        public ActionResult<string> GetLoggingLevel()
        {
            return systemInfo.InMemoryDBController.MinLoggingLevel;  // systemInfo.InMemoryDBController.MinLoggingLevel;
        }


        /// <summary>
        /// Return all hotels with errorcounter >= 4: 
        /// List[0]=PDFErrors, List[1]=SqlErrors
        /// </summary>
        /// <param name="hotelId"></param>
        /// <returns></returns>
        [HttpGet("GetIssues")]
        public ActionResult<IssuesModel> GetIssues( [FromServices]InMemoryPdfErrorCounter InMemoryPdfErrorCounter, [FromServices] InMemorySqlErrorCounter InMemorySqlErrorCounter)
        {
            IssuesModel issues = new IssuesModel();

            issues.Descriptions.Add("Στα παρακάτω ξενοδοχεία υπάρχει πρόβλημα στη μεταφορά των PDF αρχείων. Ανατρέξτε στα 'Hotel Logs' και ελέγξτε αν το Service 'ΗitProtelServices' είναι ενεργό στον Server του ξενοδοχείου.");
            issues.Issues.Add(InMemoryPdfErrorCounter.GetIssues());

            issues.Descriptions.Add("Στα παρακάτω ξενοδοχεία υπάρχει πρόβλημα επικοινωνίας με την DB του ξενοδοχείου ή άλλα θέματα Sql. Ανατρέξτε στα 'Hotel Logs' για επιπλέον πληροφορίες.");
            issues.Issues.Add(InMemorySqlErrorCounter.GetIssues());
            return Ok(issues);
        }

    }
}