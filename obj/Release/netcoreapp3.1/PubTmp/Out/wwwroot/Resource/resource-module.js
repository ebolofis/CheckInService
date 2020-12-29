function CustomResource() {
    var resource = this;
    resource.api = null;
    resource.configurationForm = ko.observable(null);
    resource.Nationality = ko.observableArray([]);
    resource.Country = ko.observableArray([]);
    resource.languages = ko.observableArray([]);
    resource.paymentMethods = ko.observableArray([]);
    resource.defaultStyles = ko.observableArray(null);
    resource.titles = ko.observableArray([]);
    resource.hotelID = null;

    resource.SetApi = function (apiUrl) {
        resource.api = apiUrl;
    };

    resource.SetHotelID = function (hotelID) {
        resource.hotelID = hotelID;
    };

    resource.InitializeResources = function () {
        GetConfigurationForm();
        GetNationalities();
        GetLanguages();
        GetPaymentMethods();
        GetDefaultStyles();
    };

    resource.GetTitles = function (languageId) {
        resource.titles([]);
        $.ajax({
            url: resource.api + "api/MainActions/GetProtelAnrede/" + resource.hotelID + "/" + languageId,
            cache: false,
            type: "GET",
            crossdomain: true,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            statusCode: {
                200: function (response) {
                    if (response != null) {
                        resource.titles([]);
                        ko.utils.arrayForEach(response, function (r) {
                            var title = new TitleModel(r);
                            resource.titles.push(title);
                        });
                    }
                }
            }
        }).fail(function (message) {
            if (message.status != 200) {
                console.log(message);
            }
        });
    };

    function GetConfigurationForm() {
        let urlToGet = resource.api + "api/Sign/GetConfigFormModel/" + resource.hotelID;
        $.ajax({
            url: urlToGet,
            cache: false,
            type: "GET",
            crossdomain: true,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            statusCode: {
                200: function (response) {
                    if (response != null) {
                        var configurationForm = new ConfigurationFormModel(response);
                        resource.configurationForm(configurationForm);
                        resource.configurationForm.notifySubscribers();
                    }
                }
            }
        }).fail(function (message) {
            //var errorMessage = message.responseJSON !== undefined ? (message.responseJSON.ExceptionMessage !== undefined ? message.responseJSON.ExceptionMessage : (message.responseJSON.ModelState !== undefined ? message.responseText : (message.responseJSON.Message !== undefined ? message.responseJSON.Message : message.responseJSON))) : (message.responseText != undefined ? message.responseText : message.statusText);
            if (message.status != 200) {
                console.log(message);
            }
        });
    };

    function GetNationalities() {
        $.ajax({
            url: resource.api + "api/Sign/GetNationalities/" + resource.hotelID,
            cache: false,
            type: "GET",
            crossdomain: true,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            statusCode: {
                200: function (response) {
                    if (response != null && response.length > 0) {
                        resource.Nationality([]);
                        ko.utils.arrayForEach(response, function (n) {
                            var nationality = new NationalityModel(n);
                            resource.Nationality.push(nationality);
                            resource.Country.push(nationality);
                        });
                        var emptyNat = {};
                        emptyNat.NatId = "0";
                        emptyNat.NatCode = "-- Select country --";
                        var selectNat = new NationalityModel(emptyNat);
                        resource.Nationality.unshift(selectNat);
                        resource.Nationality.notifySubscribers();
                        resource.Country.notifySubscribers();
                    }
                }
            }
        }).fail(function (message) {
            if (message.status != 200) {
                console.log(message);
            }
        });
    };

    function GetLanguages() {
        $.ajax({
            url: resource.api + "api/Sign/GetLanguages/" + resource.hotelID,
            cache: false,
            type: "GET",
            crossdomain: true,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            statusCode: {
                200: function (response) {
                    if (response != null && response.length > 0) {
                        resource.languages([]);
                        ko.utils.arrayForEach(response, function (l) {
                            var language = new LanguageModel(l);
                            resource.languages.push(language);
                        });
                        resource.languages.notifySubscribers();
                    }
                }
            }
        }).fail(function (message) {
            if (message.status != 200) {
                console.log(message);
            }
        });
    };

    function GetPaymentMethods() {
        $.ajax({
            url: resource.api + "api/Sign/GetMethodOfPayments/" + resource.hotelID,
            cache: false,
            type: "GET",
            crossdomain: true,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            statusCode: {
                200: function (response) {
                    if (response != null && response.length > 0) {
                        resource.paymentMethods([]);
                        ko.utils.arrayForEach(response, function (pm) {
                            var paymentMethod = new PaymentMethodModel(pm);
                            resource.paymentMethods.push(paymentMethod);
                        });
                        resource.paymentMethods.notifySubscribers();
                    }
                }
            }
        }).fail(function (message) {
            if (message.status != 200) {
                console.log(message);
            }
        });
    };

    function GetDefaultStyles() {
        
        $.ajax({
            url: resource.api + "api/Sign/GetFormatsModel/" + resource.hotelID,
            cache: false,
            type: "GET",
            crossdomain: true,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            statusCode: {
                200: function (response) {
                    if (response != null) {
                        var stylesModel = new globalAttributesModel(response);
                        resource.defaultStyles(stylesModel);
                        resource.defaultStyles.notifySubscribers();
                    }
                }
            }
        }).fail(function (message) {
            if (message.status != 200) {
                console.log(message);
            }
        });
    };

}