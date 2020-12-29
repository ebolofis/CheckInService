function CustomSignalR() {
    let sig = this;
    sig.api = null;
    sig.hubName = "SignHub";
    sig.group = null;
    sig.connection = null;
    sig.proxy = null;
    sig.disconnectTimeout1 = null;
    sig.disconnectTimeout2 = null;
    sig.signalRFlag = ko.observable(false);
    sig.Interval1 = null;
    sig.Interval2 = null;
    sig.String1 = "";
    sig.showTimerFlag = ko.observable(false);
    sig.isContactless = "";


    sig.status = ko.observable(connectionStatusesEnum.Disconnected);
    sig.baseinfo = ko.observable(null);
    sig.String1Encrypted = ko.observable(null);
    sig.hotelLogo = ko.observable(null);

    sig.stateConversion = {
        0: "connecting",
        1: "connected",
        2: "reconnecting",
        4: "disconnected"
    };
    //sig.connection = ko.observable(null);
    sig.customer = ko.observable(null);
    sig.signalRModel = ko.observable(null);
    sig.languageSet = ko.observable(true);
    sig.contactlessobj = ko.observable(null);
    sig.postingCustomer = false;

    sig.SetApi = function (apiUrl) {
        sig.api = apiUrl;
    };

    sig.SetHotelID = function (hotelID) {
        sig.hotelID = hotelID;
    };

    sig.SetSignalRModel = function (signalRConfig, checkForContactless) {
        sig.signalRModel(signalRConfig);
        sig.isContactless = checkForContactless;
    };

    sig.Connect = async function (group) {
        if (group !== null && group !== "") {
            sig.group = group + "-" + sig.hotelID;
        }
        if (sig.isContactless == "") {
            if (sig.signalRModel() !== null && sig.signalRModel() !== undefined) {
                if (sig.signalRModel().IsEnabled == true) {
                    start(sig.group);
                }
                else {
                    ApplySignalRConfiguration();
                }
            }
        }
    };

    function ApplySignalRBindings() {
        sig.connection.on("ReceiveMessage", (String1, String1Encrypted) => {
            sig.String1Encrypted(String1Encrypted);
            GetFromMobile(String1);
        });
        sig.connection.onclose(function (e) {
            if (!sig.signalRFlag()) {
                connectNew(sig.group);
            }
        });
    };

    function Connecting() {
        sig.connection.start({
            jsonp: true
        }).done(function () {
            console.log("Connected, connection id = " + sig.connection.id);
            JoinGroup();
        }).fail(function (error) {
            console.log("Could not connect: " + error);
        });
    };

    function JoinGroup() {
        var group = sig.connection.qs.group;
        sig.proxy.invoke("Join", group).done(function () {
            console.log("Joined group = " + sig.connection.qs.group);
        }).fail(function (error) {
            console.log("Could not connect: " + error);
        });
    };

    function start(group) {
        sig.connection = new signalR.HubConnectionBuilder()
            .withUrl("/SignHub")
            .configureLogging(signalR.LogLevel.Information)
            .build();
        connectNew(sig.group);
    };

    async function connectNew(group) {
        try {
            await sig.connection.start();
            console.assert(sig.connection.state === signalR.HubConnectionState.Connected);
            console.log("Successfully Connected to the Hub : SignHub");
            console.log("Trying AddUserToGroup");
            sig.connection.invoke("AddUserToGroup", group).catch(err => console.error(err.toString()));
            console.log("Invoked AddUserToGroup");
            ApplySignalRBindings();
            //############# Call Threashold 1 ################//
            //###############################################//
            sig.disconnectTimeout1 = setTimeout(function () {
                sig.signalRFlag(true);
                sig.showTimerFlag(true);
                sig.connection.stop();
                sig.Interval1 = setInterval(function () {
                    var timeleft = sig.signalRModel().Interval1;
                    var downloadTimer = setInterval(function () {
                        document.getElementById("countdowntimer").textContent = timeleft;
                        timeleft--;
                        if (timeleft <= 0)
                            clearInterval(downloadTimer);
                    }, 1000);
                    GetDataFromDictionary();
                }, sig.signalRModel().Interval1 * 1000)
            }, (sig.signalRModel().Threashold1 * 60 * 1000));
            //############# Call Threashold 2 ################//
            //###############################################//
            sig.disconnectTimeout2 = setTimeout(function () {
                clearInterval(sig.Interval1);
                sig.Interval2 = setInterval(function () {
                    var timeleft = sig.signalRModel().Interval2;
                    var downloadTimer = setInterval(function () {
                        document.getElementById("countdowntimer").textContent = timeleft;
                        timeleft--;
                        if (timeleft <= 0)
                            clearInterval(downloadTimer);
                    }, 1000);
                    GetDataFromDictionary();
                }, sig.signalRModel().Interval2 * 1000)
            }, (sig.signalRModel().Threashold2 * 60 * 1000));
        } catch (err) {
            console.assert(sig.connection.state === signalR.HubConnectionState.Disconnected);
            console.log("Failed to Connect to SignalR with group" + sig.group, err);
            setTimeout(() => start(), 5000);
        }
    };

    function ApplySignalRConfiguration() {
        //############# Call Threashold 1 ################//
        //###############################################//
        sig.disconnectTimeout1 = setTimeout(function () {
            sig.showTimerFlag(true);
            sig.Interval1 = setInterval(function () {
                var timeleft = sig.signalRModel().Interval1;
                var downloadTimer = setInterval(function () {
                    document.getElementById("countdowntimer").textContent = timeleft;
                    timeleft--;
                    if (timeleft <= 0)
                        clearInterval(downloadTimer);
                }, 1000);
                GetDataFromDictionary();
            }, sig.signalRModel().Interval1 * 1000)
        }, (sig.signalRModel().Threashold1 * 60 * 1000));
        //############# Call Threashold 2 ################//
        //###############################################//
        sig.disconnectTimeout2 = setTimeout(function () {
            clearInterval(sig.Interval1);
            sig.Interval2 = setInterval(function () {
                var timeleft = sig.signalRModel().Interval2;
                var downloadTimer = setInterval(function () {
                    document.getElementById("countdowntimer").textContent = timeleft;
                    timeleft--;
                    if (timeleft <= 0)
                        clearInterval(downloadTimer);
                }, 1000);
                GetDataFromDictionary();
            }, sig.signalRModel().Interval2 * 1000)
        }, (sig.signalRModel().Threashold2 * 60 * 1000));
    }

    function GetFromMobile(String1) {
        var urlAddress = sig.api + "api/MainActions/GetFromMobile/" + sig.hotelID + "/" + String1;
        $.ajax({
            url: urlAddress,
            cache: false,
            type: "GET",
            crossdomain: true,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            statusCode: {
                200: function (response) {
                    if (response != null) {
                        sig.languageSet(false);
                        sig.showTimerFlag(false);
                        clearInterval(sig.Interval1);
                        clearInterval(sig.Interval2);
                        var tmpCustomerList = [];
                        var baseinfo = {};
                        baseinfo.HotelId = response.HotelId;
                        baseinfo.Mode = response.Mode;
                        baseinfo.Group = response.Group;
                        baseinfo.HotelDescription = response.HotelDescription;
                        baseinfo.Status = response.Status;
                        baseinfo.String1 = response.String1;
                        sig.baseinfo(baseinfo);
                        if (typeof tmp1 !== 'undefined') {
                            ko.utils.arrayForEach(response.FormFastCheckInModelList, function (custProfile) {
                                var customer = new FastCheckInCustomerModel(custProfile);
                                customer.Country = customer.CountryId;
                                if (customer.DateOfBirth == "1900-01-01T00:00:00") {
                                    customer.DateOfBirth = null;
                                }
                                tmpCustomerList.push(customer);
                            });
                        }
                        else {
                            ko.utils.arrayForEach(response.FormFastCheckInModelList, function (custProfile) {
                                var customer = new FastCheckInCustomerModel(custProfile);
                                tmpCustomerList.push(customer);
                            });
                        }
                        sig.customer(tmpCustomerList);
                        if (baseinfo.Mode == 0) {
                            if (typeof tmp1 !== 'undefined') {
                                LanguageHandler.selectedDictionary.notifySubscribers();
                                tmp1.currentTab = 0;
                                showTab(0);
                            }
                            if (typeof page1 !== 'undefined') {
                                LanguageHandler.selectedDictionary.notifySubscribers();
                                page1.hasErrorMessage(false);
                                page1.currentTab = 0;
                                showTab(0);
                            }
                        }
                    }
                    else {
                        if (localStorage.CustomerInput) {
                            sig.customer(JSON.parse(localStorage.CustomerInput));
                        }
                        else {
                            sig.customer(null);
                        }
                    }
                }
            }
        }).fail(function (message) {
            if (message.status != 200) {
                console.log(message);
            }
        });
    };

    sig.InvokeFromMobile = function (String1) {
        GetFromMobile(String1);
    }

    function GetDataFromDictionary() {
        $.ajax({
            url: "/FC/GetFromDictionary?HotelId=" + sig.hotelID + "&Group=" + sig.group,
            cache: false,
            type: "GET",
            crossdomain: false,
            dataType: "json",
            ContentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data !== undefined && data !== null) {
                    sig.String1 = data.String1;
                    if (sig.String1 !== null && sig.String1 !== "") {
                        GetFromMobile(sig.String1);
                    }
                } else {
                    console.log("Unable to get String1 From Dictionsry!");
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    };

    function ConnectionStateChanged(state) {
        console.log("SignalR state changed from: \"" + sig.stateConversion[state.oldState] + "\" to: \"" + sig.stateConversion[state.newState] + "\"");
        if (state.newState == 0) {
            sig.status(connectionStatusesEnum.Connecting);
        }
        else if (state.newState == 1) {
            sig.status(connectionStatusesEnum.Connected);
            GetAsignedCustomer();
        }
        else if (state.newState == 2) {
            sig.status(connectionStatusesEnum.Reconnecting);
        }
        else if (state.newState == 4) {
            sig.status(connectionStatusesEnum.Disconnected);
            Reconnect();
        }
    };

    function Reconnect() {
        setTimeout(function () {
            Connecting();
        }, 10000);
    };

    function GetContactlessCust(fname, lname, s1) {
        var name = sig.group;
        var status = customerStatusesEnum.Contactless;
        var obj = {};
        obj.firstname = fname;
        obj.lastname = lname;
        obj.string1 = s1;
        sig.contactlessobj(obj)
        sig.contactlessobj.notifySubscribers();
    };
}