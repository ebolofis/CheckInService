﻿function HotelModel(model) {
    var hotel = this;
    hotel.Id = model !== undefined && model !== null ? model.Id : 0;
    hotel.Description = model !== undefined && model !== null ? model.Description : null;
    hotel.Server = model !== undefined && model !== null ? model.Server : null;
    hotel.DataBase = model !== undefined && model !== null ? model.DataBase : null;
    hotel.Username = model !== undefined && model !== null ? model.Username : null;
    hotel.Password = model !== undefined && model !== null ? model.Password : null;
    hotel.JsonPath = model !== undefined && model !== null ? model.JsonPath : null;
    hotel.LogoPath = model !== undefined && model !== null ? model.LogoPath : null;
    hotel.Logo = model !== undefined && model !== null ? model.Logo : null;
    hotel.LogoWallet = model !== undefined && model !== null ? model.LogoWallet : null;
    hotel.LogoWalletRetina = model !== undefined && model !== null ? model.LogoWalletRetina : null;
    hotel.ProfileType = model !== undefined && model !== null ? model.ProfileType : profileTypeEnumerator.MainProfile;
    hotel.Usage = model !== undefined && model !== null ? model.Usage : null;
    hotel.HotelApi = model !== undefined && model !== null ? model.HotelApi : null;
    hotel.HotelType = model !== undefined && model !== null ? model.HotelType : hotelTypeEnumerator.Protel;
    hotel.IsActive = model !== undefined && model !== null ? model.IsActive : false;
    hotel.RelativeLogoPath = "../../images/Logos/Logos/" + hotel.Id + "/" + hotel.Logo;
};