function PreCheckInViewModel() {
    var self = this;
    self.hotelId = hotelIdHTML || "";
    self.reservationId = reservationIdHTML || "";
    self.currentUrl = (window.location.protocol) + "//" + (window.location.hostname) + (window.location.port != "" ? ":" + window.location.port : "");
    self.settings = ko.observable(null);
    self.hotel = ko.observable(null);
    self.reservationIdInput = null;
    self.firstNameInput = null;
    self.lastNameInput = null;
    self.arrivalDateInput = ko.observable(null);
    self.arrivalDateInputInput = null;
    self.departureDateInput = ko.observable(null);
    self.departureDateInputInput = null;
    self.searchingCustomer = ko.observable(false);
    self.dateTimePicker = new CustomDateTimePicker();

    self.InitializeView = function () {
        if (self.reservationId !== "") {
            let redirectionLink = "/FC/redirect?u=" + self.currentUrl + "&str=" + self.reservationId + "&h=" + self.hotelId;
            window.location.href = redirectionLink;
        } else {
            GetSettings();
            GetHotel();
            InitializeDatePickers();
        }
    };

    self.SelectDate = function (element, input, toggle, startDate, fieldToChange) {
        let pickerType = pickerTypeEnumerator.Date;
        let objectToChange = self;
        self.dateTimePicker.InitializeDateTimePicker(element, input, toggle, pickerType, startDate, objectToChange, fieldToChange);
    };

    self.SearchCustomerByCode = function () {
        if (self.reservationIdInput === null || self.reservationIdInput === "") {
            iziToast.warning({
                title: "Warning",
                message: "Please insert reservation Id!",
                timeout: 2000
            });
            return;
        }
        self.searchingCustomer(true);
        let searchInfo = new PostReservationInfoModel(self.hotelId, self.reservationIdInput, null);
        SearchCustomer(searchInfo);
    };

    self.SearchCustomerByName = function () {
        SanitizeDates();
        if (self.firstNameInput === null || self.firstNameInput === "") {
            iziToast.warning({
                title: "Warning",
                message: "Please insert first name!",
                timeout: 2000
            });
            return;
        }
        if (self.lastNameInput === null || self.lastNameInput === "") {
            iziToast.warning({
                title: "Warning",
                message: "Please insert last name!",
                timeout: 2000
            });
            return;
        }
        //if (self.arrivalDateInput() === null) {
        if (self.arrivalDateInputInput === null || self.arrivalDateInputInput === "") {
            iziToast.warning({
                title: "Warning",
                message: "Please insert arrival date!",
                timeout: 2000
            });
            return;
        }
        //if (self.departureDateInput() === null) {
        if (self.departureDateInputInput === null || self.departureDateInputInput === "") {
            iziToast.warning({
                title: "Warning",
                message: "Please insert departure date!",
                timeout: 2000
            });
            return;
        }
        self.searchingCustomer(true);
        let reservationInfo = new ReservationInfoModel();
        reservationInfo.FirstName = self.firstNameInput;
        reservationInfo.LastName = self.lastNameInput;
        reservationInfo.Arrival = moment(self.arrivalDateInputInput).format("DD/MM/YYYY");//moment(self.arrivalDateInput()).format("DD/MM/YYYY");
        reservationInfo.Departure = moment(self.departureDateInputInput).format("DD/MM/YYYY");//moment(self.departureDateInput()).format("DD/MM/YYYY");
        let searchInfo = new PostReservationInfoModel(self.hotelId, null, reservationInfo);
        SearchCustomer(searchInfo);
    };

    function GetSettings() {
        $.ajax({
            url: "/PreCheckIn/GetSettings?hotelId=" + self.hotelId,
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
                        message: "Unable to get settings for hotel with id: " + self.hotelId + "!",
                        timeout: 2000
                    });
                }
            },
            error: function (error) {
                iziToast.error({
                    title: "Error",
                    message: "Unable to get settings for hotel with id: " + self.hotelId + "!",
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
            if (self.settings().entryAttributes.backColor !== null && self.settings().entryAttributes.backColor !== "") {
                let entryElements = document.getElementsByClassName("entry-element");
                if (entryElements != null) {
                    ko.utils.arrayForEach(entryElements, function (e) {
                        e.style.backgroundColor = self.settings().entryAttributes.backColor;
                    });
                }
            }
            if (self.settings().entryAttributes.fontFamily !== null && self.settings().entryAttributes.fontFamily !== "") {
                let entryElements = document.getElementsByClassName("entry-element");
                if (entryElements != null) {
                    ko.utils.arrayForEach(entryElements, function (e) {
                        e.style.fontFamily = self.settings().entryAttributes.fontFamily + ", Roboto";
                    });
                }
            }
            if (self.settings().entryAttributes.textColor !== null && self.settings().entryAttributes.textColor !== "") {
                let entryElements = document.getElementsByClassName("entry-element");
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
            url: "/PreCheckIn/GetHotel?hotelId=" + self.hotelId,
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
                        message: "Unable to get hotel with id: " + self.hotelId + "!",
                        timeout: 2000
                    });
                }
            },
            error: function (error) {
                iziToast.error({
                    title: "Error",
                    message: "Unable to get hotel with id: " + self.hotelId + "!",
                    timeout: 2000
                });
                console.log(error);
            }
        });
    };

    function GetHotelLogo() {
        $.ajax({
            url: "/PreCheckIn/GetHotelLogo?hotelId=" + self.hotelId,
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
                        message: "Unable to get logo for hotel with id: " + self.hotelId + "!",
                        timeout: 2000
                    });
                }
            },
            error: function (error) {
                iziToast.error({
                    title: "Error",
                    message: "Unable to get logo for hotel with id: " + self.hotelId + "!",
                    timeout: 2000
                });
                console.log(error);
            }
        });
    };

    function InitializeDatePickers() {
        $("#arrivalDatePickerInputInput").datepicker({
            startDate: "01/01/1900",
            endDate: "01/01/2050"
        });
        $("#departureDatePickerInputInput").datepicker({
            startDate: "01/01/1900",
            endDate: "01/01/2050"
        });
    };

    function SanitizeDates() {
        let arrivalElement = document.getElementById("arrivalDatePickerInputInput");
        if (arrivalElement !== null) {
            let arrivalValue = arrivalElement.value;
            self.arrivalDateInputInput = arrivalValue;
        }
        let departureElement = document.getElementById("departureDatePickerInputInput");
        if (departureElement !== null) {
            let departureValue = departureElement.value;
            self.departureDateInputInput = departureValue;
        }
    };

    function SearchCustomer(searchInfo) {
        $.ajax({
            url: "/PreCheckIn/SearchReservation",
            cache: false,
            type: "POST",
            crossdomain: false,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            data: searchInfo,
            success: function (response) {
                if (response !== undefined && response !== null) {
                    let reservationResult = new ReservationResultModel(response);
                    let redirectionLink = "/FC/redirect?u=" + self.currentUrl + "&str=" + reservationResult.encryptedReservationId + "&h=" + self.hotelId;
                    window.location.href = redirectionLink;
                } else {
                    iziToast.error({
                        title: "Error",
                        message: "Unable to find reservation!",
                        timeout: 2000
                    });
                }
            },
            error: function (error) {
                iziToast.error({
                    title: "Error",
                    message: "Unable to find reservation!",
                    timeout: 2000
                });
                console.log(error);
            }
        }).always(function () {
            self.searchingCustomer(false);
        });
    };

};