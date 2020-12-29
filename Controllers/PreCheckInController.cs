using CheckinBack.Models;
using CheckinBack.MainLogic;
//using CheckinBack.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using CheckinFront.Models;

namespace CheckInService.Controllers
{
    public class PreCheckInController : Controller
    {
        private readonly HotelsML hotelsML;
        private readonly MainActionsML mainActionsML;
        private readonly PreCheckInML preCheckInML;
        private readonly ILogger<PreCheckInController> logger;

        public PreCheckInController(HotelsML _hotelsML, MainActionsML _mainActionsML, PreCheckInML _preCheckInML, ILogger<PreCheckInController> _logger)
        {
            this.hotelsML = _hotelsML;
            this.mainActionsML = _mainActionsML;
            this.preCheckInML = _preCheckInML;
            this.logger = _logger;
        }

        public IActionResult Barcode(string h)
        {
            ViewBag.Title = "Pre-CheckIn";
            ViewBag.HotelId = h;
            ViewBag.ReservationId = null;
            return View();
        }

        public IActionResult BarcodeReady(string h, string str)
        {
            ViewBag.Title = "Pre-CheckIn";
            ViewBag.HotelId = h;
            ReservationSearchModel reservationInformation = new ReservationSearchModel();
            reservationInformation.hotelId = h;
            reservationInformation.reservationId = str;
            reservationInformation.reservationInfo = null;
            string url = null;
            ReservationSearchResultModel reservationResult = SearchReservation(reservationInformation, GroupModeEnum.Remote);
            if (reservationResult != null)
            {
                ViewBag.ReservationId = reservationResult.encryptedReservationId;
                return RedirectToAction("redirect", "FC", new { u = url, str = reservationResult.encryptedReservationId, h = reservationInformation.hotelId });
            }
            else
            {
                ViewBag.ReservationId = null;
                return View("Barcode");
            }
        }

        public IActionResult BarcodeReadyReadOnly(string h, string str)
        {
            ViewBag.Title = "Pre-CheckIn";
            ViewBag.HotelId = h;
            ReservationSearchModel reservationInformation = new ReservationSearchModel();
            reservationInformation.hotelId = h;
            reservationInformation.reservationId = str;
            string url = null;
            reservationInformation.reservationInfo = null;
            ReservationSearchResultModel reservationResult = SearchReservation(reservationInformation, GroupModeEnum.RemoteReadOnly);
            if (reservationResult != null)
            {
                ViewBag.ReservationId = reservationResult.encryptedReservationId;
                return RedirectToAction("redirect", "FC", new { u = url, str = reservationResult.encryptedReservationId, h = reservationInformation.hotelId });
            }
            else
            {
                ViewBag.ReservationId = null;
                return View("Barcode");
            }
        }

        public GlobalAttributesModel GetSettings(string hotelId)
        {
            GlobalAttributesModel settings;
            try
            {
                settings = preCheckInML.GetSettings(hotelId);
            }
            catch (Exception ex)
            {
                logger.LogError($"ERROR getting settings for HotelId {hotelId ?? "<NULL>"} : " + ex.ToString());
                settings = null;
            }
            return settings;
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
                logger.LogError($"ERROR getting hotel with id {hotelId ?? "<NULL>"} : " + ex.ToString());
                hotel = null;
            }
            return hotel;
        }

        public ImageLogoModel GetHotelLogo(string hotelId)
        {
            ImageLogoModel imageLogo;
            try
            {
                imageLogo = preCheckInML.GetHotelLogo(hotelId);
            }
            catch(BussinessException) { throw; }
            catch (Exception ex)
            {
                logger.LogError($"ERROR getting logo for hotel with id {hotelId ?? "<NULL>"} : " + ex.ToString());
                imageLogo = null;
            }
            return imageLogo;
        }

        public ReservationSearchResultModel SearchReservation(ReservationSearchModel generalReservation, GroupModeEnum ModeStatus = GroupModeEnum.Remote)
        {
            if (generalReservation == null) return null;
            ReservationSearchResultModel reservationResult;
            try
            {
                HotelInfoModel hotel = hotelsML.Get(generalReservation.hotelId);
                List<FastCheckInModel> reservations = preCheckInML.SearchReservations(hotel, generalReservation, ModeStatus);
                if (reservations != null && reservations.Count > 0)
                {
                    string reservationId = reservations[0].String1;
                    string encryptedReservationId = preCheckInML.EncryptReservation(reservationId);
                    if (encryptedReservationId != null)
                    {
                        reservationResult = new ReservationSearchResultModel();
                        reservationResult.encryptedReservationId = encryptedReservationId;
                    }
                    else
                    {
                        reservationResult = null;
                    }
                }
                else
                {
                    reservationResult = null;
                }
            }
            catch (BussinessException) { throw; }
            catch (Exception ex)
            {
                logger.LogError($"ERROR searching customer for hotel id { (generalReservation != null ? generalReservation.hotelId ?? "<NULL>" : "<NULL>") } and reservation id { (generalReservation != null ? generalReservation.reservationId ?? "<NULL>" : "<NULL>") } and first name { (generalReservation != null && generalReservation.reservationInfo != null ? generalReservation.reservationInfo.FirstName ?? "<NULL>" : "<NULL>") } and last name { (generalReservation != null && generalReservation.reservationInfo != null ? generalReservation.reservationInfo.LastName ?? "<NULL>" : "<NULL>") } and arrival date { (generalReservation != null && generalReservation.reservationInfo != null ? generalReservation.reservationInfo.Arrival.ToString() : "<NULL>") } and departure date { (generalReservation != null && generalReservation.reservationInfo != null ? generalReservation.reservationInfo.Departure.ToString() : "<NULL>") } : " + ex.ToString());
                reservationResult = null;
            }
            return reservationResult;
        }

    }
}