using System;
using CheckinBack.Models;
using CheckinBack.MainLogic;
using CheckinBack.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CheckInService.Controllers
{
    public class HousekeepingController : Controller
    {
        private readonly HotelsML hotelsML;
        private readonly HousekeepingML housekeepingML;
        private readonly MainActionsML mainActionsML;
        private readonly ILogger<HousekeepingController> logger;

        public HousekeepingController(HotelsML _hotelsML, HousekeepingML _housekeepingML, MainActionsML _mainActionsML, ILogger<HousekeepingController> _logger)
        {
            this.hotelsML = _hotelsML;
            this.housekeepingML = _housekeepingML;
            this.mainActionsML = _mainActionsML;
            this.logger = _logger;
        }

        public IActionResult Index(string h, string z, string r, string a, string d)
        {
            ViewBag.Title = "Housekeeping Service";
            ViewBag.HotelId = h;
            ViewBag.RoomId = z;
            ViewBag.Room = r;
            ViewBag.Arrival = a;
            ViewBag.Departure = d;
            return View();
        }

        public GlobalAttributesModel GetSettings(string hotelId)
        {
            GlobalAttributesModel setting;
            try
            {
                setting = housekeepingML.GetSettings(hotelId);
            }
            catch (Exception ex)
            {
                logger.LogError($"ERROR getting setting for hotel with id {hotelId ?? "<NULL>"} : " + ex.ToString());
                setting = null;
            }
            return setting;
        }

        public bool ValidateReservation(string hotelId, string roomId, string arrival, string departure)
        {
            bool validated;
            try
            {
                bool dateValidated = housekeepingML.ValidateReservation(arrival, departure);
                if (dateValidated)
                {
                    CallReservationStatusModel reservationValidation = housekeepingML.CreateReservationValidation(hotelId, roomId, arrival, departure);
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
            catch (Exception ex)
            {
                logger.LogError($"ERROR validating customer for arrival {arrival ?? "<NULL>"} and departure {departure ?? "<NULL>"} : " + ex.ToString());
                validated = false;
            }
            return validated;
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
                imageLogo = housekeepingML.GetHotelLogo(hotelId);
            }
            catch (Exception ex)
            {
                logger.LogError($"ERROR getting logo for hotel with id {hotelId ?? "<NULL>"} : " + ex.ToString());
                imageLogo = null;
            }
            return imageLogo;
        }

        public RoomDescriptionModel DecryptRoom(string room)
        {
            RoomDescriptionModel roomDescription;
            try
            {
                roomDescription = new RoomDescriptionModel();
                roomDescription.room = housekeepingML.DecryptRoom(room);
            }
            catch (Exception ex)
            {
                logger.LogError($"ERROR decrypting room {room ?? "<NULL>"} : " + ex.ToString());
                roomDescription = null;
            }
            return roomDescription;
        }

        public RoomStatusModel GetRoomStatus(string hotelId, string roomId)
        {
            RoomStatusModel roomStatus;
            try
            {
                HotelInfoModel hotel = hotelsML.Get(hotelId);
                roomStatus = housekeepingML.GetRoomStatus(hotel, roomId);
            }
            catch (BussinessException) { throw; }
            catch (Exception ex)
            {
                logger.LogError($"ERROR getting room status for hotel id {hotelId ?? "<NULL>"} and room id {roomId ?? "<NULL>"} : " + ex.ToString());
                roomStatus = null;
            }
            return roomStatus;
        }

        public bool UpdateRoomStatus(PostRoomStatus generalRoomStatus)
        {
            bool roomStatusUpdated;
            try
            {
                HotelInfoModel hotel = hotelsML.Get(generalRoomStatus.hotelId);
                long roomStatusId = housekeepingML.UpdateRoomStatus(hotel, generalRoomStatus.roomStatus, generalRoomStatus.room, generalRoomStatus.updateType);
                roomStatusUpdated = true;
            }
            catch (BussinessException) { throw; }
            catch (Exception ex)
            {
                logger.LogError($"ERROR updating room status for hotel id { (generalRoomStatus != null ? generalRoomStatus.hotelId ?? "<NULL>" : "<NULL>") } and room id { (generalRoomStatus != null && generalRoomStatus.roomStatus != null ? generalRoomStatus.roomStatus.RoomId.ToString() : "<NULL>") } : " + ex.ToString());
                roomStatusUpdated = false;
            }
            return roomStatusUpdated;
        }
    }
}