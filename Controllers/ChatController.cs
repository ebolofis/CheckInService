using System;
using System.Collections.Generic;
using CheckinBack.Models;
using CheckinBack.MainLogic;
using CheckinBack.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CheckInService.Controllers
{
    public class ChatController : Controller
    {
        private readonly HotelsML hotelsML;
        private readonly ChatML chatML;
        private readonly MainActionsML mainActionsML;
        private readonly ILogger<ChatController> logger;

        public ChatController(HotelsML _hotelsML, ChatML _chatML, MainActionsML _mainActionsML, ILogger<ChatController> _logger)
        {
            this.hotelsML = _hotelsML;
            this.chatML = _chatML;
            this.mainActionsML = _mainActionsML;
            this.logger = _logger;
        }

        public IActionResult Index(string h, string re, string a, string d)
        {
            ViewBag.Title = "Chat Service";
            ViewBag.HotelId = h;
            ViewBag.ReservationId = re;
            ViewBag.Arrival = a;
            ViewBag.Departure = d;
            return View();
        }

        public GlobalAttributesModel GetSettings(string hotelId)
        {
            GlobalAttributesModel setting;
            
            try
            {
                setting = chatML.GetSettings(hotelId);
            }
            catch (Exception ex)
            {
                logger.LogError($"ERROR getting setting for hotel with id {hotelId ?? "<NULL>"} : " + ex.ToString());
                setting = null;
            }
            return setting;
        }

        public bool ValidateReservation(string hotelId, string reservationId, string arrival, string departure)
        {
            bool validated;
            try
            {
                bool dateValidated = chatML.ValidateReservation(arrival, departure);
                if (dateValidated)
                {
                    CallReservationStatusModel reservationValidation = chatML.CreateReservationValidation(hotelId, reservationId);
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
                imageLogo = chatML.GetHotelLogo(hotelId);
            }
            catch (Exception ex)
            {
                logger.LogError($"ERROR getting logo for hotel with id {hotelId ?? "<NULL>"} : " + ex.ToString());
                imageLogo = null;
            }
            return imageLogo;
        }

        public List<MessageModel> GetCustomerMessages(string hotelId, string reservationId)
        {
            List<MessageModel> messages;
            try
            {
                HotelInfoModel hotel = hotelsML.Get(hotelId);
                messages = chatML.GetCustomerMessages(hotel, reservationId);
            }
            catch (BussinessException) { throw; }
            catch (Exception ex)
            {
                logger.LogError($"ERROR getting customer messages for hotel id {hotelId ?? "<NULL>"} and reservation id {reservationId ?? "<NULL>"} : " + ex.ToString());
                messages = null;
            }
            return messages;
        }

        public bool UpdateCustomerMessage(PostMessageModel generalMessage)
        {
            bool messageUpdated;
            try
            {
                HotelInfoModel hotel = hotelsML.Get(generalMessage.hotelId);
                long messageId = chatML.UpdateCustomerMessage(hotel, generalMessage.message);
                messageUpdated = true;
            }
            catch (BussinessException) { throw; }
            catch (Exception ex)
            {
                logger.LogError($"ERROR updating customer message for hotel id { (generalMessage != null ? generalMessage.hotelId ?? "<NULL>" : "<NULL>") } and message id { (generalMessage != null && generalMessage.message != null ? generalMessage.message.Id.ToString() : "<NULL>") } : " + ex.ToString());
                messageUpdated = false;
            }
            return messageUpdated;
        }

        public bool SetMessageInformation(MessagesInfo messageInformation)
        {
            bool messageInformationSet;
            try
            {
                messageInformationSet = chatML.SetMessageInformation(messageInformation);
            }
            catch (Exception ex)
            {
                logger.LogError($"ERROR setting message information for reservation with id { (messageInformation != null ? messageInformation.reservationId ?? "<NULL>" : "<NULL>") } : " + ex.ToString());
                messageInformationSet = false;
            }
            return messageInformationSet;
        }

        public ResponseMessageModel InsertCustomerMessage(PostMessageModel generalMessage)
        {
            ResponseMessageModel responseMessage = new ResponseMessageModel();
            try
            {
                HotelInfoModel hotel = hotelsML.Get(generalMessage.hotelId);
                string outcome;
                responseMessage.messageId = chatML.InsertCustomerMessage(hotel, generalMessage.reservationId, generalMessage.message, out outcome);
                responseMessage.errorMessage = outcome;
            }
            catch (BussinessException) { throw; }
            catch (Exception ex)
            {
                logger.LogError($"ERROR inserting customer message for hotel id { (generalMessage != null ? generalMessage.hotelId ?? "<NULL>" : "<NULL>") } and message id { (generalMessage != null && generalMessage.message != null ? generalMessage.message.Id.ToString() : "<NULL>") } : " + ex.ToString());
                responseMessage.messageId = 0;
                responseMessage.errorMessage = "Unable to insert customer message!";
            }
            return responseMessage;
        }
    }
}