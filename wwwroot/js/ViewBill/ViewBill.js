function ViewBillViewModel() {
    var self = this;
    self.hotelId = hotelIdHTML || "";
    self.reservationId = reservationIdHTML || "";
    self.arrival = arrivalHTML || "";
    self.departure = departureHTML || "";
    self.settings = ko.observable(null);
    self.checkedIn = ko.observable(false);
    self.hotel = ko.observable(null);
    self.formats = ko.observable(null);
    self.analyticBills = ko.observable(null);
    self.accountBallance = ko.observable(null);
    self.HotelLogo = ko.observable(null);
    self.updateBillsInterval = null;

    self.InitializeView = function () {
        GetSettings();
        $.ajax({
            url: "/ViewBill/ValidateReservation?hotelId=" + self.hotelId + "&reservationId=" + self.reservationId + "&arrival=" + self.arrival + "&departure=" + self.departure,
            cache: false,
            type: "GET",
            crossdomain: false,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response !== undefined && response !== null && response) {
                    self.checkedIn(true);
                    GetHotel();
                    GetHotelLogo();
                    GetBills();
                    GetBallance();
                } else {
                    iziToast.warning({
                        title: "Warning",
                        message: "Customer has not checked in yet!"
                    });
                }
            },
            error: function (error) {
                iziToast.error({
                    title: "Error",
                    message: "Customer has not checked in yet!"
                });
                console.log(error);
            }
        });
    };

    self.CleanRoom = function () {
        iziToast.success({
            title: "Success",
            message: "Cleaning room..."
        });
    };

    function GetHotel() {
        $.ajax({
            url: "/ViewBill/GetHotel?hotelId=" + self.hotelId,
            cache: false,
            type: "GET",
            crossdomain: false,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response !== undefined && response !== null) {
                    let hotel = new HotelModel(response);
                    self.hotel(hotel);
                    self.updateBillsInterval = setInterval(function () {
                    }, 1800000);
                } else {
                    iziToast.warning({
                        title: "Warning",
                        message: "Unable to get hotel with id: " + self.hotelId + "!"
                    });
                }
            },
            error: function (error) {
                iziToast.error({
                    title: "Error",
                    message: "Unable to get hotel with id: " + self.hotelId + "!"
                });
                console.log(error);
            }
        });
    };

    function GetHotelLogo() {
        $.ajax({
            url: "/FC/GetHotelLogo?hotelId=" + self.hotelId,
            cache: false,
            type: "GET",
            crossdomain: false,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response !== undefined && response !== null) {
                    let hotelLogo = "data:image/png;base64," + response.Logo;
                    self.HotelLogo(hotelLogo);
                } else {
                    console.log("Unable to get hotelLogo with id: " + self.hotelId + "!");
                }
            },
            error: function (error) {
                iziToast.error({
                    title: "Error",
                    message: "Unable to get hotel logo with id: " + self.hotelId + "!"
                });
                console.log(error);
            }
        });
    };

    function GetSettings() {
        $.ajax({
            url: "/ViewBill/GetSettings?hotelId=" + self.hotelId,
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
                    iziToast.warning({
                        title: "Warning",
                        message: "Unable to get settings for hotel with id: " + self.hotelId + "!"
                    });
                }
            },
            error: function (error) {
                iziToast.error({
                    title: "Error",
                    message: "Unable to get settings for hotel with id: " + self.hotelId + "!"
                });
                console.log(error);
            }
        });
    };

    function UpdateView() {
        if (self.settings().pageBackgroundColor !== undefined && self.settings().pageBackgroundColor !== null && self.settings().pageBackgroundColor !== "") {
            let mainBodyElement = document.getElementById("mainBody");
            if (mainBodyElement !== null) {
                mainBodyElement.style.backgroundColor = self.settings().pageBackgroundColor;
            }
        }
        if (self.settings().sectionBackgroundColor !== undefined && self.settings().sectionBackgroundColor !== null && self.settings().sectionBackgroundColor !== "") {
            let mainContainerElement = document.getElementById("mainContainer");
            if (mainContainerElement !== null) {
                mainContainerElement.style.backgroundColor = self.settings().sectionBackgroundColor;
            }
        }
        if (self.settings().sectionFontColor !== undefined && self.settings().sectionFontColor !== null && self.settings().sectionFontColor !== "") {
            let mainHeaderElement = document.getElementById("mainHeader");
            if (mainHeaderElement !== null) {
                mainHeaderElement.style.color = self.settings().sectionFontColor;
            }
        }
        if (self.settings().labelAttributes.fontFamily !== null && self.settings().labelAttributes.fontFamily !== "") {
            let labelElements = document.getElementsByClassName("label-element");
            if (labelElements != null) {
                ko.utils.arrayForEach(labelElements, function (e) {
                    e.style.fontFamily = self.settings().labelAttributes.fontFamily;
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
    };

    function GetBills() {
        $.ajax({
            url: "/ViewBill/GetAnalyticBills?hotelId=" + self.hotelId + "&reservationId=" + self.reservationId,
            cache: false,
            type: "GET",
            crossdomain: false,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response !== undefined && response !== null) {
                    ko.utils.arrayForEach(response, function (d) {
                        d.Date = moment(d.Date).format("DD-MM-YYYY");
                    });
                    self.analyticBills(response);
                    UpdateView();
                } else {
                    iziToast.warning({
                        title: "Warning",
                        message: "Unable to get Analytic Bills!"
                    });
                }
            },
            error: function (error) {
                iziToast.error({
                    title: "Error",
                    message: "Unable to get Analytic Bills!"
                });
                console.log(error);
            }
        });
    };

    function GetBallance() {
        $.ajax({
            url: "/ViewBill/GetAccountBalance?hotelId=" + self.hotelId + "&reservationId=" + self.reservationId,
            cache: false,
            type: "GET",
            crossdomain: false,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response !== undefined && response !== null) {
                    self.accountBallance(response);
                    UpdateView();
                } else {
                    iziToast.warning({
                        title: "Warning",
                        message: "Unable to get Account Balance!"
                    });
                }
            },
            error: function (error) {
                iziToast.error({
                    title: "Error",
                    message: "Unable to get Account Balance!"
                });
                console.log(error);
            }
        });
    };
};