using System;
using System.Collections.Generic;
using CheckinBack.Models;
using CheckinBack.MainLogic;
using CheckinBack.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using CheckinBack.InMemoryDB;

namespace CheckInService.Controllers
{
    public class ViewBillController : Controller
    {
        private readonly HotelsML hotelsML;
        private readonly ViewBillML viewBillML;
        private readonly MainActionsML mainActionsML;
        private readonly CheckInConfigHelper checkInModelsHelper;
        private readonly ILogger<ViewBillController> logger;
        private readonly InMemoryDbHotelConHist inMemDbConHist;

        public ViewBillController(HotelsML _hotelsML, ViewBillML _viewBillML, MainActionsML _mainActionsML, CheckInConfigHelper _checkInModelsHelper, ILogger<ViewBillController> _logger, InMemoryDbHotelConHist inMemDbConHist)
        {
            this.hotelsML = _hotelsML;
            this.viewBillML = _viewBillML;
            this.mainActionsML = _mainActionsML;
            this.checkInModelsHelper = _checkInModelsHelper;
            this.logger = _logger;
            this.inMemDbConHist = inMemDbConHist;
        }

        public IActionResult Index(string h, string le, string a, string d)
        {
            ViewBag.Title = "View Bill";
            ViewBag.HotelId = h;
            ViewBag.ReservationId = le;
            ViewBag.Arrival = a;
            ViewBag.Departure = d;
            return View();
        }

        public bool ValidateReservation(string hotelId, string reservationId, string arrival, string departure)
        {
            bool validated;
            try
            {
                bool dateValidated = viewBillML.ValidateReservation(arrival, departure);
                if (dateValidated)
                {
                    CallReservationStatusModel reservationValidation = viewBillML.CreateReservationValidation(hotelId, reservationId);
                    int reservationStatus = mainActionsML.GetReservationStatus(reservationValidation);
                    if (reservationStatus == 1)
                    {
                        validated = true;
                    }
                    else
                    {
                        validated = false;
                    }
                }
                else
                {
                    validated = false;
                }
            }
            catch (BussinessException) { throw; }
            catch (Exception ex)
            {
                string err = $"View Bill ERROR validating Reservation. Provided reservationId: {reservationId}, arrival:{arrival}, departure{departure}. ";
                inMemDbConHist.AddLogEntryAsync(hotelId, new LoggingModel(ex,err,"",DBErrorLevel.Error));
                logger.LogError(err + ex.ToString());
                validated = false;
            }
            return true;
        }

        public HotelInfoModel GetHotel(string hotelId)
        {
            HotelInfoModel hotel;
            try
            {
                hotel = hotelsML.Get(hotelId);
            }
            catch (BussinessException) { throw; }
            catch (Exception ex)
            {
                logger.LogError($"View Bill ERROR getting hotel with id {hotelId ?? "<NULL>"} : " + ex.ToString());
                hotel = null;
            }
            return hotel;
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
            catch (BussinessException) { throw; }
            catch (Exception ex)
            {
                logger.LogError($"ERROR getting Hotel Logo for HotelId: " + HotelId + " -->" + ex.ToString());
                imageModel = null;
            }
            return imageModel;
        }

        public GlobalAttributesModel GetSettings(string hotelId)
        {
            GlobalAttributesModel setting;
            try
            {
                setting = checkInModelsHelper.GetJsonFormats(hotelId);
            }
            catch (BussinessException) { throw; }
            catch (Exception ex)
            {
                logger.LogError($"View Bill ERROR getting setting for hotel with id {hotelId ?? "<NULL>"} : " + ex.ToString());
                setting = null;
            }
            return setting;
        }

        public List<ViewBillModel> GetAnalyticBills(string hotelId, string reservationId)
        {
            List<ViewBillModel> viewBillModel = new List<ViewBillModel>();
            HotelInfoModel hotel;
            try
            {
                hotel = hotelsML.Get(hotelId);
                if(hotel != null)
                {
                    viewBillModel = viewBillML.GetAnalyticBills(hotel, reservationId);
                }
                else
                {
                    logger.LogWarning($"View Bill Warning Fail to get hotel with id {hotelId ?? "<NULL>"} : ");
                    return null;
                }
            }
            catch (BussinessException) { throw; }
            catch (Exception ex)
            {
                string err = $"View Bill ERROR getting Analytic Bill. Provided reservationId: {reservationId}. ";
                inMemDbConHist.AddLogEntryAsync(hotelId, new LoggingModel(ex, err, "", DBErrorLevel.Error));
                logger.LogError(err+$" HotelId {hotelId}." + ex.ToString());
                viewBillModel = null;
            }
            return viewBillModel;
        }

        public decimal GetAccountBalance(string hotelId, string reservationId)
        {
            decimal Balance;
            HotelInfoModel hotel;
            try
            {
                hotel = hotelsML.Get(hotelId);
                if (hotel != null)
                {
                    Balance = viewBillML.GetAccountBalance(hotel, reservationId);
                }
                else
                {
                    logger.LogWarning($"View Bill Warning Fail to get hotel with id {hotelId ?? "<NULL>"} : ");
                    return 0;
                }
            }
            catch (BussinessException) { throw; }
            catch (Exception ex)
            {
                string err = $"View Bill ERROR getting Account Balance. Provided reservationId: {reservationId}.";
                inMemDbConHist.AddLogEntryAsync(hotelId, new LoggingModel(ex, err, "", DBErrorLevel.Error));
                logger.LogError(err + $" HotelId {hotelId}." + ex.ToString());
                Balance = 0;
            }
            return Balance;
        }
    }
}