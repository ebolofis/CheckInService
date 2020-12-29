function ValidationForm(msg) {
    var checkMandatoriesFlag = checkMandatories(msg);
    if (checkMandatoriesFlag == false) {
        window.scrollTo(0, 0);
        tmp1.Loading(false);
        return false;
    }

    var checkMandatoriesCheckboxesFlag = initMadatoriesCheckboxes();
    if (checkMandatoriesCheckboxesFlag == false) {
        window.scrollTo(0, 0);
        tmp1.Loading(false);
        return false;
    }

    var emailValidationFlag = EmailValidation();
    if (emailValidationFlag == false) {
        ErrorMessage();
        window.scrollTo(0, 0);
        tmp1.Loading(false);
        return false;
    }
    return true;
}

function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");

    x[n].style.display = "block";

    // ... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = LanguageHandler.selectedDictionary().SignatureBtnTxt;
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n)
}

function fixStepIndicator(n) {
    tmp1.customerIndex(n);
    InitializeDatePickers();
    clearTimeout(tmp1.timeoutCleanForm)
    if (SignalRHandler.baseinfo().Mode != 2 && SignalRHandler.baseinfo().Mode != 4) {
        cleanCustomerForm();
    }
    //Add Required Values to other Profiles
    GenerateRestProfilesData();

    window.scrollTo(0, 0);
    tmp1.Loading(false);
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:

    x[n].className += " active";
}

function cleanCustomerForm() {
    if (SignalRHandler.customer() != null) {
        tmp1.timeoutCleanForm = setTimeout(function () {
            //Send Log to Api that Form is Clear
            CheckinTimeoutClient();
            //Delete Customer From Dictionary
            const urldeletestring1 = localStorage.ConfigURL + 'api/MainActions/Delete/' + localStorage.ConfigHotelName + "/" + SignalRHandler.baseinfo().String1;
            xhr.open("GET", urldeletestring1);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send();
            //Delete Localstorage
            SignalRHandler.customer(null);
            SignalRHandler.baseinfo().Mode = 0;
            SignalRHandler.baseinfo().String1 = "";
            localStorage.baseinfo = JSON.stringify(SignalRHandler.baseinfo());
            var link = localStorage.ConfigURL + "FC/GetSettings?u=&g=" + localStorage.ConfigGroupName + "&h=" + localStorage.ConfigHotelName;
            window.location.href = link;
            console.log("Customer has been Deleted from Form because was created more than 30 minutes before!");
        }, 1800000);
    }
};

function ErrorMessage(parameters) {
    swal("You have entered an invalid email address! \n ", {
        buttons: false,
        timer: 3000,
    });
}

function CheckinTimeoutClient() {
    var hotelid = SignalRHandler.baseinfo().HotelId;
    var string1 = SignalRHandler.baseinfo().String1;
    var group = SignalRHandler.baseinfo().Group;
    $.ajax({
        url: localStorage.ConfigURL + "api/MainActions/CheckinTimeout/" + hotelid + "/" + string1 + "/" + group,
        cache: false,
        type: "GET",
        crossdomain: true,
        dataType: "json",
        ContentType: "application/json; charset=utf-8",
        success: function (response) {
            console.log("Send CheckinTimeout Successfully!");
        }
    }).fail(function (message) {
        if (message.status != 200) {
            console.log(message);
        }
    });
}

function GenerateRestProfilesData() {
    if (tmp1.customerIndex() > 0) {
        var tabElement = document.getElementsByClassName("tab")[tmp1.customerIndex()];
        //Email
        if (SignalRHandler.customer()[tmp1.customerIndex()].Email == null || SignalRHandler.customer()[tmp1.customerIndex()].Email == "" || SignalRHandler.customer()[tmp1.customerIndex()].Email == undefined) {
            if (tabElement.getElementsByClassName("textBoxesClass")["Email"]) {
                SignalRHandler.customer()[tmp1.customerIndex()].Email = SignalRHandler.customer()[0].Email;
                tabElement.getElementsByClassName("textBoxesClass")["Email"].value = SignalRHandler.customer()[tmp1.customerIndex()].Email;
            }
        }
        //Mobile
        if (SignalRHandler.customer()[tmp1.customerIndex()].Mobile == null || SignalRHandler.customer()[tmp1.customerIndex()].Mobile == "" || SignalRHandler.customer()[tmp1.customerIndex()].Mobile == undefined) {
            if (tabElement.getElementsByClassName("textBoxesClass")["Mobile"]) {
                SignalRHandler.customer()[tmp1.customerIndex()].Mobile = SignalRHandler.customer()[0].Mobile;
                tabElement.getElementsByClassName("textBoxesClass")["Mobile"].value = SignalRHandler.customer()[tmp1.customerIndex()].Mobile;
            }
        }
        //Street
        if (SignalRHandler.customer()[tmp1.customerIndex()].Street == null || SignalRHandler.customer()[tmp1.customerIndex()].Street == "" || SignalRHandler.customer()[tmp1.customerIndex()].Street == undefined) {
            if (tabElement.getElementsByClassName("textBoxesClass")["Street"]) {
                SignalRHandler.customer()[tmp1.customerIndex()].Street = SignalRHandler.customer()[0].Street;
                tabElement.getElementsByClassName("textBoxesClass")["Street"].value = SignalRHandler.customer()[tmp1.customerIndex()].Street;
            }
        }
        //City
        if (SignalRHandler.customer()[tmp1.customerIndex()].City == null || SignalRHandler.customer()[tmp1.customerIndex()].City == "" || SignalRHandler.customer()[tmp1.customerIndex()].City == undefined) {
            if (tabElement.getElementsByClassName("textBoxesClass")["City"]) {
                SignalRHandler.customer()[tmp1.customerIndex()].City = SignalRHandler.customer()[0].City;
                tabElement.getElementsByClassName("textBoxesClass")["City"].value = SignalRHandler.customer()[tmp1.customerIndex()].City;
            }
        }
        //ZipCode
        if (SignalRHandler.customer()[tmp1.customerIndex()].ZipCode == null || SignalRHandler.customer()[tmp1.customerIndex()].ZipCode == "" || SignalRHandler.customer()[tmp1.customerIndex()].ZipCode == undefined) {
            if (tabElement.getElementsByClassName("textBoxesClass")["ZipCode"]) {
                SignalRHandler.customer()[tmp1.customerIndex()].ZipCode = SignalRHandler.customer()[0].ZipCode;
                tabElement.getElementsByClassName("textBoxesClass")["ZipCode"].value = SignalRHandler.customer()[tmp1.customerIndex()].ZipCode;
            }
        }
    }
}