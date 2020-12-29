function HousekeepingViewModel() {
    var self = this;
    self.hotelIdJS = hotelIdHTML || "";
    self.roomIdJS = roomIdHTML || "";
    self.roomJS = roomHTML || "";
    self.arrivalJS = arrivalHTML || "";
    self.departureJS = departureHTML || "";
    self.settings = ko.observable(null);
    self.checkedIn = ko.observable(false);
    self.hotel = ko.observable(null);
    self.room = ko.observable(null);
    self.roomStatus = ko.observable(null);
    self.updateRoomStatusInterval = null;
    self.updatingRoomStatus = ko.observable(false);
    self.hygieneStatusOptions = ko.observable({
        1: "Clean",
        2: "Dirty",
        3: "Out of service",
        4: "Checked",
        5: "Touched",
        6: "Cleaning in progress",
        10: "Make room"
    });
    self.occupationStatusOptions = ko.observable({
        0: "Vacant",
        1: "Occupied"
    });

    self.InitializeView = function () {
        GetSettings();
        $.ajax({
            url: "/Housekeeping/ValidateReservation?hotelId=" + self.hotelIdJS + "&roomId=" + self.roomIdJS + "&arrival=" + self.arrivalJS + "&departure=" + self.departureJS,
            cache: false,
            type: "GET",
            crossdomain: false,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response !== undefined && response !== null && response) {
                    self.checkedIn(true);
                    GetHotel();
                    GetRoom();
                    GetRoomStatus();
                    self.updateRoomStatusInterval = setInterval(function () {
                        GetRoomStatus();
                    }, 600000);
                } else {
                    iziToast.error({
                        title: "Error",
                        message: "Customer has not checked in yet!",
                        timeout: 2000
                    });
                }
            },
            error: function (error) {
                iziToast.error({
                    title: "Error",
                    message: "Customer has not checked in yet!",
                    timeout: 2000
                });
                console.log(error);
            }
        });
    };

    self.CleanRoom = function () {
        self.roomStatus().CleanStatus(hygieneStatusEnumerator.MakeRoom);
        self.updatingRoomStatus(true);
        UpdateRoomStatus(roomChangeTypeEnumerator.hygiene);
    };

    self.OccupyVacateRoom = function () {
        if (self.roomStatus().OccupationStatus() == occupationStatusEnumerator.Vacant) {
            self.roomStatus().OccupationStatus(occupationStatusEnumerator.Occupied);
        } else if (self.roomStatus().OccupationStatus() == occupationStatusEnumerator.Occupied) {
            self.roomStatus().OccupationStatus(occupationStatusEnumerator.Vacant);
        } else {
            return;
        }
        self.updatingRoomStatus(true);
        UpdateRoomStatus(roomChangeTypeEnumerator.occupation);
    };

    function GetSettings() {
        $.ajax({
            url: "/Housekeeping/GetSettings?hotelId=" + self.hotelIdJS,
            cache: false,
            type: "GET",
            crossdomain: false,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response !== undefined && response !== null) {
                    let settings = new SettingsModel(response);
                    self.settings(settings);
                    UpdateView();
                } else {
                    iziToast.error({
                        title: "Error",
                        message: "Unable to get setting for hotel with id: " + self.hotelIdJS + "!",
                        timeout: 2000
                    });
                }
            },
            error: function (error) {
                iziToast.error({
                    title: "Error",
                    message: "Unable to get setting for hotel with id: " + self.hotelIdJS + "!",
                    timeout: 2000
                });
                console.log(error);
            }
        });
    };

    function UpdateView() {
        if (self.settings() !== null) {
            if (self.settings().pageBackgroundColor !== null && self.settings().pageBackgroundColor !== "") {
                let mainBodyElement = document.getElementById("mainBody");
                if (mainBodyElement !== null) {
                    mainBodyElement.style.backgroundColor = self.settings().pageBackgroundColor;
                }
            }
            if (self.settings().sectionBackgroundColor !== null && self.settings().sectionBackgroundColor !== "") {
                let mainContainerElement = document.getElementById("mainContainer");
                if (mainContainerElement !== null) {
                    mainContainerElement.style.backgroundColor = self.settings().sectionBackgroundColor;
                }
            }
            if (self.settings().sectionFontColor !== null && self.settings().sectionFontColor !== "") {
                let mainHeaderElement = document.getElementById("mainHeader");
                if (mainHeaderElement !== null) {
                    mainHeaderElement.style.color = self.settings().sectionFontColor;
                }
            }
            if (self.settings().labelAttributes.fontFamily !== null && self.settings().labelAttributes.fontFamily !== "") {
                let labelElements = document.getElementsByClassName("label-element");
                if (labelElements != null) {
                    ko.utils.arrayForEach(labelElements, function (e) {
                        e.style.fontFamily = self.settings().labelAttributes.fontFamily + ", Roboto";
                    });
                }
            }
            if (self.settings().labelAttributes.textColor !== null && self.settings().labelAttributes.textColor !== "") {
                let labelElements = document.getElementsByClassName("label-element");
                if (labelElements != null) {
                    ko.utils.arrayForEach(labelElements, function (e) {
                        e.style.color = self.settings().labelAttributes.textColor;
                    });
                }
            }
            if (self.settings().entryAttributes.fontFamily !== null && self.settings().entryAttributes.fontFamily !== "") {
                let entryElements = document.getElementsByClassName("semi-entry-element");
                if (entryElements != null) {
                    ko.utils.arrayForEach(entryElements, function (e) {
                        e.style.fontFamily = self.settings().entryAttributes.fontFamily + ", Roboto";
                    });
                }
            }
            if (self.settings().entryAttributes.textColor !== null && self.settings().entryAttributes.textColor !== "") {
                let entryElements = document.getElementsByClassName("semi-entry-element");
                if (entryElements != null) {
                    ko.utils.arrayForEach(entryElements, function (e) {
                        e.style.color = self.settings().entryAttributes.textColor;
                    });
                }
            }
        }
    };

    function GetHotel() {
        $.ajax({
            url: "/Housekeeping/GetHotel?hotelId=" + self.hotelIdJS,
            cache: false,
            type: "GET",
            crossdomain: false,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response !== undefined && response !== null) {
                    let hotel = new HotelModel(response);
                    self.hotel(hotel);
                    GetHotelLogo();
                } else {
                    iziToast.error({
                        title: "Error",
                        message: "Unable to get hotel with id: " + self.hotelIdJS + "!",
                        timeout: 2000
                    });
                }
            },
            error: function (error) {
                iziToast.error({
                    title: "Error",
                    message: "Unable to get hotel with id: " + self.hotelIdJS + "!",
                    timeout: 2000
                });
                console.log(error);
            }
        });
    };

    function GetHotelLogo() {
        $.ajax({
            url: "/Housekeeping/GetHotelLogo?hotelId=" + self.hotelIdJS,
            cache: false,
            type: "GET",
            crossdomain: false,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response !== undefined && response !== null) {
                    let hotelLogo = new HotelLogoModel(response);
                    let hotelLogoSource = "data:image/png;base64," + hotelLogo.Logo;
                    self.hotel().RelativeLogoPath(hotelLogoSource);
                } else {
                    iziToast.error({
                        title: "Error",
                        message: "Unable to get logo for hotel with id: " + self.hotelIdJS + "!",
                        timeout: 2000
                    });
                }
            },
            error: function (error) {
                iziToast.error({
                    title: "Error",
                    message: "Unable to get logo for hotel with id: " + self.hotelIdJS + "!",
                    timeout: 2000
                });
                console.log(error);
            }
        });
    };

    function GetRoom() {
        $.ajax({
            url: "/Housekeeping/DecryptRoom?room=" + self.roomJS,
            cache: false,
            type: "GET",
            crossdomain: false,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response !== undefined && response !== null) {
                    self.room(response.room);
                } else {
                    iziToast.error({
                        title: "Error",
                        message: "Unable to get room: " + self.roomJS + "!",
                        timeout: 2000
                    });
                }
            },
            error: function (error) {
                iziToast.error({
                    title: "Error",
                    message: "Unable to get room: " + self.roomJS + "!",
                    timeout: 2000
                });
                console.log(error);
            }
        });
    };

    function GetRoomStatus() {
        $.ajax({
            url: "/Housekeeping/GetRoomStatus?hotelId=" + self.hotelIdJS + "&roomId=" + self.roomIdJS,
            cache: false,
            type: "GET",
            crossdomain: false,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response !== undefined && response !== null) {
                    let roomStatus = new RoomStatusModel(response);
                    self.roomStatus(roomStatus);
                } else {
                    iziToast.error({
                        title: "Error",
                        message: "Unable to get room status with room id: " + self.roomIdJS + " for hotel with id: " + self.hotelIdJS + "!",
                        timeout: 2000
                    });
                }
            },
            error: function (error) {
                iziToast.error({
                    title: "Error",
                    message: "Unable to get room status with room id: " + self.roomIdJS + " for hotel with id: " + self.hotelIdJS + "!",
                    timeout: 2000
                });
                console.log(error);
            }
        });
    };

    function UpdateRoomStatus(updateType) {
        let generalRoomStatus = new PostRoomStatusModel(self.hotelIdJS, updateType, self.roomStatus(), self.room());
        $.ajax({
            url: "/Housekeeping/UpdateRoomStatus",
            cache: false,
            type: "POST",
            crossdomain: false,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            data: generalRoomStatus,
            success: function (response) {
                if (response !== undefined && response !== null && response) {
                    GetRoomStatus();
                    iziToast.success({
                        title: "Success",
                        message: "Room status was updated!",
                        timeout: 2000
                    });
                } else {
                    iziToast.error({
                        title: "Error",
                        message: "Unable to update room status!",
                        timeout: 2000
                    });
                }
            },
            error: function (error) {
                iziToast.error({
                    title: "Error",
                    message: "Unable to update room status!",
                    timeout: 2000
                });
                console.log(error);
            }
        }).always(function () {
            self.updatingRoomStatus(false);
        });
    };

};