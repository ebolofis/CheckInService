function CustomLanguage() {
    var language = this;
    language.api = null;
    language.availableLanguages = ko.observableArray([]);
    language.defaultLanguage = null;
    language.selectedLanguage = ko.observable(null);
    language.selectedDictionary = ko.observable(null);
    language.messagesCompleted = false;
    language.privacyPolicyMessageCompleted = false;
    language.GetTranslationsCompleted = false;
    language.SetApi = function (apiUrl) {
        language.api = apiUrl;
    };

    language.SetHotelID = function (hotelID) {
        language.hotelID = hotelID;
    };

    language.GetTranslations = function () {
        GetLanguagesAndListMessages();
        var messagesLoaded = setInterval(function () {
            if (language.messagesCompleted && language.privacyPolicyMessageCompleted) {
                clearInterval(messagesLoaded);
                SetDefaultLanguage();
                language.GetTranslationsCompleted = true;
            }
        }, 1000);
    };

    language.ChangeLanguage = function (languageCode) {
        if (languageCode === undefined || languageCode === null || languageCode === 'undefined' || languageCode === 'null' || language.selectedLanguage() === languageCode) {
            return;
        }
        var ChangeLanguageLoaded = setInterval(function () {
            if (language.GetTranslationsCompleted) {
                clearInterval(ChangeLanguageLoaded);
                var newLanguage = ko.utils.arrayFirst(language.availableLanguages(), function (l) {
                    return l.Code == languageCode;
                });
                if (newLanguage != null) {
                    language.selectedLanguage(newLanguage.Code);
                    //language.selectedLanguage.notifySubscribers();
                    language.selectedDictionary(newLanguage.Dictionary);
                   // language.selectedDictionary.notifySubscribers();
                } else {
                    SetDefaultLanguage();
                }
            }
        }, 100);
    };

    function GetLanguagesAndListMessages() {
        
        if (language.hotelID) {
        $.ajax({
            url: language.api + "api/Sign/GetConfigListModel/" + language.hotelID,
            cache: false,
            type: "GET",
            crossdomain: true,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            statusCode: {
                200: function (response) {
                    if (response != null && response.length > 0) {
                        var firstMessage = response[0];
                        var allLanguages = firstMessage.AvailableLanguages;
                        if (allLanguages != null && allLanguages.length > 0) {
                            ko.utils.arrayForEach(allLanguages, function (l) {
                                var languageObject = new LanguageGeneralModel();
                                languageObject.Id = l.LanguageId;
                                languageObject.Name = l.LanguageName;
                                languageObject.Code = l.Code;
                                languageObject.IsDefault = l.IsDefault;
                                language.availableLanguages.push(languageObject);
                                if (languageObject.IsDefault) {
                                    language.defaultLanguage = languageObject.Code;
                                }
                            });
                            if (language.defaultLanguage == null) {
                                var firstLanguage = language.availableLanguages()[0];
                                language.defaultLanguage = firstLanguage.Code;
                            }
                            ko.utils.arrayForEach(response, function (fm) {
                                ko.utils.arrayForEach(language.availableLanguages(), function (al) {
                                    var key = fm.ControlName;
                                    var value = fm.Language[al.Code];
                                    al.Dictionary[key] = value;
                                });
                            });
                            GetMessages();
                            GetPrivacyPolicyMessage();
                        }
                    }
                }
            }
        }).fail(function (message) {
            if (message.status != 200) {
                console.log(message);
            }
        });

        }
    };

    function GetMessages() {
        $.ajax({
            url: language.api + "api/Sign/GetMessagesLanguageModel/" + language.hotelID,
            cache: false,
            type: "GET",
            crossdomain: true,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            statusCode: {
                200: function (response) {
                    if (response != null && response.length > 0) {
                        ko.utils.arrayForEach(response, function (m) {
                            ko.utils.arrayForEach(language.availableLanguages(), function (al) {
                                var key = m.Key;
                                var value = m.LanguageMsg[al.Code];
                                al.Dictionary[key] = value;
                            });
                        });
                        language.messagesCompleted = true;
                    }
                }
            }
        }).fail(function (message) {
            if (message.status != 200) {
                console.log(message);
            }
        });
    };

    function GetPrivacyPolicyMessage() {
        $.ajax({
            url: language.api + "api/Sign/GetPrivacyPolicyModel/" + language.hotelID,
            cache: false,
            type: "GET",
            crossdomain: true,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            statusCode: {
                200: function (response) {
                    if (response != null) {
                        ko.utils.arrayForEach(language.availableLanguages(), function (al) {
                            var key = "privacyPolicyDescription";
                            var value = response.privacyPolicyDescription[al.Code];
                            al.Dictionary[key] = value;
                        });
                    }
                    language.privacyPolicyMessageCompleted = true;
                }
            }
        }).fail(function (message) {
            if (message.status != 200) {
                console.log(message);
            }
        });
    };

    function SetDefaultLanguage() {
        var defaultLanguage = ko.utils.arrayFirst(language.availableLanguages(), function (l) {
            return l.Code == language.defaultLanguage;
        });
        if (defaultLanguage != null) {
            language.selectedLanguage(defaultLanguage.Code);
            //language.selectedLanguage.notifySubscribers();
            language.selectedDictionary(defaultLanguage.Dictionary);
            //language.selectedDictionary.notifySubscribers();
            localStorage.GlobalLanguageCode = defaultLanguage.Code;
        }
    };

}