﻿function FastCheckInCustomerModel(model) {
    var fastCheckInCustomer = this;
    fastCheckInCustomer.MemberId = model.MemberId;
    fastCheckInCustomer.FirstName = model.FirstName;
    fastCheckInCustomer.LastName = model.LastName;
    fastCheckInCustomer.Company = model.Company;
    fastCheckInCustomer.DateOfBirth = model.DateOfBirth;
    fastCheckInCustomer.Street = model.Street;
    fastCheckInCustomer.ZipCode = model.ZipCode;
    fastCheckInCustomer.City = model.City;
    fastCheckInCustomer.Country = model.Country;
    fastCheckInCustomer.CountryId = model.CountryId;
    fastCheckInCustomer.CreditCard = model.CreditCard;
    fastCheckInCustomer.Email = model.Email;
    fastCheckInCustomer.Phone = model.Phone;
    fastCheckInCustomer.Mobile = model.Mobile;
    fastCheckInCustomer.ReservationNo = model.ReservationNo;
    fastCheckInCustomer.Passport = model.Passport;
    fastCheckInCustomer.Nationality = model.Nationality;
    fastCheckInCustomer.MethodOfPayment = model.MethodOfPayment;
    fastCheckInCustomer.Arrival = model.Arrival;
    fastCheckInCustomer.Departure = model.Departure;
    fastCheckInCustomer.Room = model.Room;
    fastCheckInCustomer.LanguageId = model.LanguageId;
    fastCheckInCustomer.LanguageCode = model.LanguageCode;
    fastCheckInCustomer.Signature = model.Signature;
    fastCheckInCustomer.User = model.User;
    fastCheckInCustomer.timestamp = model.timestamp;
    fastCheckInCustomer.ShowPrice = model.ShowPrice;
    fastCheckInCustomer.Price = model.Price;
    fastCheckInCustomer.IsInvoice = model.IsInvoice;
    fastCheckInCustomer.CheckAllAds = model.CheckAllAds;
    fastCheckInCustomer.SendLetterValue = model.SendLetterValue;
    fastCheckInCustomer.SendPhoneValue = model.SendPhoneValue;
    fastCheckInCustomer.SendEmailValue = model.SendEmailValue;
    fastCheckInCustomer.SendTextMessageValue = model.SendTextMessageValue;
    fastCheckInCustomer.Afm = model.Afm;
    fastCheckInCustomer.AcceptanceText = model.AcceptanceText;
    fastCheckInCustomer.SignalRId = model.SignalRId;
    fastCheckInCustomer.InvoiceAfm = model.InvoiceAfm;
    fastCheckInCustomer.InvoiceCompany = model.InvoiceCompany;
    fastCheckInCustomer.InvoiceOccupation = model.InvoiceOccupation;
    fastCheckInCustomer.InvoiceStreet = model.InvoiceStreet;
    fastCheckInCustomer.InvoiceZipCode = model.InvoiceZipCode;
    fastCheckInCustomer.InvoiceCity = model.InvoiceCity;
    fastCheckInCustomer.InvoiceCountry = model.InvoiceCountry;
    fastCheckInCustomer.CheckedItem1Value = model.CheckedItem1Value;
    fastCheckInCustomer.CheckedItem2Value = model.CheckedItem2Value;
    fastCheckInCustomer.CheckedItem3Value = model.CheckedItem3Value;
    fastCheckInCustomer.CheckedItem4Value = model.CheckedItem4Value;
    fastCheckInCustomer.CheckedItem5Value = model.CheckedItem5Value;
    fastCheckInCustomer.CheckedItem6Value = model.CheckedItem6Value;
    fastCheckInCustomer.CheckedItem7Value = model.CheckedItem7Value;
    fastCheckInCustomer.CheckedItem8Value = model.CheckedItem8Value;
    fastCheckInCustomer.CheckedItem9Value = model.CheckedItem9Value;
    fastCheckInCustomer.CheckedItem10Value = model.CheckedItem10Value;
    fastCheckInCustomer.CheckedItem11Value = model.CheckedItem11Value;
    fastCheckInCustomer.CheckedItem12Value = model.CheckedItem12Value;
    fastCheckInCustomer.CheckedItem13Value = model.CheckedItem13Value;
    fastCheckInCustomer.CheckedItem14Value = model.CheckedItem14Value;
    fastCheckInCustomer.CheckedItem15Value = model.CheckedItem15Value;
    fastCheckInCustomer.CheckedItem16Value = model.CheckedItem16Value;
    fastCheckInCustomer.CheckedItem17Value = model.CheckedItem17Value;
    fastCheckInCustomer.CheckedItem18Value = model.CheckedItem18Value;
    fastCheckInCustomer.CheckedItem19Value = model.CheckedItem19Value;
    fastCheckInCustomer.CheckedItem20Value = model.CheckedItem20Value;
    fastCheckInCustomer.AcceptMail = model.AcceptMail;
    fastCheckInCustomer.gender = model.gender;
    fastCheckInCustomer.titel = model.titel;
    fastCheckInCustomer.String1 = model.String1;
    fastCheckInCustomer.Buchnr = model.Buchnr;
    fastCheckInCustomer.kdnr = model.kdnr;
    fastCheckInCustomer.reschar = model.reschar;
    fastCheckInCustomer.mpehotel = model.mpehotel;
    fastCheckInCustomer.buchstatus = model.buchstatus;
    fastCheckInCustomer.leistacc = model.leistacc;
    fastCheckInCustomer.zimmernr = model.zimmernr;
    fastCheckInCustomer.roomStatus = model.roomStatus;
    fastCheckInCustomer.anrede = model.anrede;
    fastCheckInCustomer.Index = model.Index;
    fastCheckInCustomer.CreateDate = model.CreateDate;
    fastCheckInCustomer.CleanRoomDayInterval = model.CleanRoomDayInterval;

    fastCheckInCustomer.FreeText1 = model.FreeText1;
    fastCheckInCustomer.FreeText2 = model.FreeText2;
    fastCheckInCustomer.FreeText3 = model.FreeText3;
    fastCheckInCustomer.FreeText4 = model.FreeText4;
    fastCheckInCustomer.FreeText5 = model.FreeText5;
    fastCheckInCustomer.FreeText6 = model.FreeText6;
    fastCheckInCustomer.FreeText7 = model.FreeText7;
    fastCheckInCustomer.FreeText8 = model.FreeText8;
    fastCheckInCustomer.FreeText9 = model.FreeText9;
    fastCheckInCustomer.FreeText10 = model.FreeText10;
    fastCheckInCustomer.FreeText11 = model.FreeText11;
    fastCheckInCustomer.FreeText12 = model.FreeText12; 
};

function SignalRModel(model) {
    var signalRModel = this;
    signalRModel.IsEnabled = model.IsEnabled;
    signalRModel.Threashold1 = model.Threashold1;
    signalRModel.Interval1 = model.Interval1;
    signalRModel.Threashold2 = model.Threashold2;
    signalRModel.Interval2 = model.Interval2;
};