function ChatViewModel() {
    var self = this;
    self.hotelId = hotelIdHTML || "";
    self.reservationId = reservationIdHTML || "";
    self.arrival = arrivalHTML || "";
    self.departure = departureHTML || "";
    self.settings = ko.observable(null);
    self.checkedIn = ko.observable(false);
    self.hotel = ko.observable(null);
    self.updateMessagesInterval = null;
    self.previousMessages = ko.observableArray([]);
    self.chatUserName = "CHATGUEST";
    self.chatMessage = null;
    self.sendingMessage = ko.observable(false);

    self.InitializeView = function () {
        GetSettings();
        $.ajax({
            url: "/Chat/ValidateReservation?hotelId=" + self.hotelId + "&reservationId=" + self.reservationId + "&arrival=" + self.arrival + "&departure=" + self.departure,
            cache: false,
            type: "GET",
            crossdomain: false,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response !== undefined && response !== null && response) {
                    self.checkedIn(true);
                    GetHotel();
                    GetMessages(true);
                    self.updateMessagesInterval = setInterval(function () {
                        GetMessages(false);
                    }, 50000);
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

    self.SendMessage = function () {
        if (self.chatMessage === null) {
            return;
        }
        self.sendingMessage(true);
        InsertMessage(self.chatMessage);
        self.chatMessage = null;
        RefreshMessageInput();
    };

    function GetSettings() {
        $.ajax({
            url: "/Housekeeping/GetSettings?hotelId=" + self.hotelId,
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
                        message: "Unable to get setting for hotel with id: " + self.hotelId + "!",
                        timeout: 2000
                    });
                }
            },
            error: function (error) {
                iziToast.error({
                    title: "Error",
                    message: "Unable to get setting for hotel with id: " + self.hotelId + "!",
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
            url: "/Chat/GetHotel?hotelId=" + self.hotelId,
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
            url: "/Chat/GetHotelLogo?hotelId=" + self.hotelId,
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

    function GetMessages(setMessageInformation) {
        $.ajax({
            url: "/Chat/GetCustomerMessages?hotelId=" + self.hotelId + "&reservationId=" + self.reservationId,
            cache: false,
            type: "GET",
            crossdomain: false,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            success: function (response) {
                if (response !== undefined && response !== null) {
                    ko.utils.arrayForEach(response, function (m) {
                        let message = new MessageModel(m);
                        let messageFound = ko.utils.arrayFirst(self.previousMessages(), function (pm) {
                            return pm.Id === message.Id;
                        });
                        if (messageFound === undefined || messageFound === null) {
                            self.previousMessages.push(message);
                            if (message.Sender !== self.chatUserName && !message.IsSeen()) {
                                UpdateMessage(message);
                            }
                        } else {
                            messageFound.IsSeen(message.IsSeen());
                            messageFound.SeenDate(message.SeenDate());
                            messageFound.SeenTime(message.SeenTime());
                            messageFound.SeenBy(message.SeenBy());
                            if (messageFound.Sender !== self.chatUserName && !messageFound.IsSeen()) {
                                UpdateMessage(messageFound);
                            }
                        }
                    });
                    RefreshMessageHistory();
                    if (setMessageInformation) {
                        SetMessageInformation();
                    }
                } else {
                    iziToast.error({
                        title: "Error",
                        message: "Unable to get customer messages with hotel id: " + self.hotelId + " and reservation id: " + self.reservationId + "!",
                        timeout: 2000
                    });
                }
            },
            error: function (error) {
                iziToast.error({
                    title: "Error",
                    message: "Unable to get customer messages with hotel id: " + self.hotelId + " and reservation id: " + self.reservationId + "!",
                    timeout: 2000
                });
                console.log(error);
            }
        });
    };

    function UpdateMessage(message) {
        message.IsSeen(true);
        message.SeenDate(moment().format());
        message.SeenTime(moment().format("HH:mm"));
        message.SeenBy(self.chatUserName);
        let generalMessage = new PostMessageModel(self.hotelId, self.reservationId, message);
        $.ajax({
            url: "/Chat/UpdateCustomerMessage",
            cache: false,
            type: "POST",
            crossdomain: false,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            data: generalMessage,
            success: function (response) {
                if (response === undefined || response === null || !response) {
                    iziToast.error({
                        title: "Error",
                        message: "Unable to update customer message with id: " + message.Id + "!",
                        timeout: 2000
                    });
                }
            },
            error: function (error) {
                iziToast.error({
                    title: "Error",
                    message: "Unable to update customer message with id: " + message.Id + "!",
                    timeout: 2000
                });
                console.log(error);
            }
        });
    };

    function RefreshMessageHistory() {
        let chatHistoryElement = document.getElementById("chatHistory");
        if (chatHistoryElement !== null) {
            chatHistoryElement.scrollTop = 999999999;
        }
    };

    function SetMessageInformation() {
        let filteredMessages = self.previousMessages().filter(m => m.Sender == self.chatUserName);
        let messageCount = filteredMessages.length;
        let lastMessageDate = null;
        if (messageCount > 0) {
            let lastMessage = filteredMessages[filteredMessages.length - 1];
            let hourComponents = lastMessage.CreationTime.split(":");
            lastMessageDate = moment(lastMessage.CreationDate).add(hourComponents[0], "hours").add(hourComponents[1], "minutes").format();
        } else {
            lastMessageDate = moment().format();
        }
        let messageInformation = new PostMessageInfoModel(self.hotelId, self.reservationId, messageCount, lastMessageDate);
        $.ajax({
            url: "/Chat/SetMessageInformation",
            cache: false,
            type: "POST",
            crossdomain: false,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            data: messageInformation,
            success: function (response) {
                if (response === undefined || response === null || !response) {
                    iziToast.error({
                        title: "Error",
                        message: "Unable to set message information!",
                        timeout: 2000
                    });
                }
            },
            error: function (error) {
                iziToast.error({
                    title: "Error",
                    message: "Unable to set message information!",
                    timeout: 2000
                });
                console.log(error);
            }
        });
    };

    function InsertMessage(chatMessage) {
        let message = new MessageModel();
        message.Sender = self.chatUserName;
        message.MessageText = chatMessage;
        let generalMessage = new PostMessageModel(self.hotelId, self.reservationId, message);
        $.ajax({
            url: "/Chat/InsertCustomerMessage",
            cache: false,
            type: "POST",
            crossdomain: false,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            data: generalMessage,
            success: function (response) {
                if (response !== undefined && response !== null) {
                    if (response.messageId !== 0) {
                        GetMessages(false);
                        iziToast.success({
                            title: "Success",
                            message: "Message was sent!",
                            timeout: 2000
                        });
                    } else {
                        iziToast.error({
                            title: "Error",
                            message: response.errorMessage,
                            timeout: 2000
                        });
                    }
                } else {
                    iziToast.error({
                        title: "Error",
                        message: "Unable to insert customer message!",
                        timeout: 2000
                    });
                }
            },
            error: function (error) {
                iziToast.error({
                    title: "Error",
                    message: "Unable to insert customer message!",
                    timeout: 2000
                });
                console.log(error);
            }
        }).always(function () {
            self.sendingMessage(false);
        });
    };

    function RefreshMessageInput() {
        let chatMessageInputElement = document.getElementById("chatMessageInput");
        if (chatMessageInputElement !== null) {
            chatMessageInputElement.value = self.chatMessage;
        }
    };

};