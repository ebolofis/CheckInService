function HotelModel(model) {
    var hotel = this;
    hotel.Id = model !== undefined && model !== null ? model.Id : null;
    hotel.Description = model !== undefined && model !== null ? model.Description : null;
    hotel.Server = model !== undefined && model !== null ? model.Server : null;
    hotel.DataBase = model !== undefined && model !== null ? model.DataBase : null;
    hotel.Username = model !== undefined && model !== null ? model.Username : null;
    hotel.Password = model !== undefined && model !== null ? model.Password : null;
    hotel.ProfileType = model !== undefined && model !== null ? model.ProfileType : profileTypeEnumerator.MainProfile;
    hotel.Usage = model !== undefined && model !== null ? model.Usage : null;
    hotel.HotelApi = model !== undefined && model !== null ? model.HotelApi : null;
    hotel.HotelType = model !== undefined && model !== null ? model.HotelType : hotelTypeEnumerator.Protel;
    hotel.IsActive = model !== undefined && model !== null ? model.IsActive : false;
    hotel.mpehotel = model !== undefined && model !== null ? model.mpehotel : 0;
    hotel.PreCheckinMode = model !== undefined && model !== null ? model.PreCheckinMode : preCheckInModeEnumerator.AllFields;
    hotel.RelativeLogoPath = ko.observable(null);
};

function HotelLogoModel(model) {
    var hotelLogo = this;
    hotelLogo.Logo = model !== undefined && model !== null ? model.Logo : null;
};