function ValidateEmail(mail) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());
}

function EmailValidation() {
    var tabElement = document.getElementsByClassName("tab")[tmp1.customerIndex()];
    var element = tabElement.getElementsByClassName("textBoxesClass").Email;
    if (element) {
        if (element.hasAttribute("required") == true) {
            var email = element.value;
            if (ValidateEmail(email)) {
                return true;
            } else {
                element.style.color = "red";
            }
        }
        else {
            if (element.value.length > 0) {
                var email = element.value;
                if (ValidateEmail(email)) {
                    return true;
                } else {
                    element.style.color = "red";
                }
            }
            else {
                return true;
            }
        }
    }
    return false;
}

function checkOneComboBoxMandatory(name, message) {
    var tabElement = document.getElementsByClassName("tab")[tmp1.customerIndex()];
    var element = tabElement.getElementsByClassName("comboBoxClasses")[name];
    if (element !== null && element != undefined && (element.value > 0 == false)) {
        iziToast.error({
            title: name,
            message: name + ' is Required!',
            timeout: 2000
        });
        return false;
    }
    else {
        return true;
    }

    }

function checkMandatories(message) {
    var flag1 = checkOneMandatory("FirstName", message);
    var flag2 = checkOneMandatory("LastName", message);
    var flag3 = checkOneMandatory("Passport", message);
    var flag4 = checkOneMandatory("ZipCode");
    var flag5 = checkOneMandatory("City", message);
    var flag6 = checkOneMandatory("Room", message);
    var flag7 = checkOneMandatory("DateOfBirth", message);
    var flag8 = checkOneMandatory("MemberId", message);
    var flag9 = checkOneMandatory("Email", message);
    var flag10 = checkOneMandatory("Company", message);
    var flag11 = checkOneComboBoxMandatory("Country", message);
    var flag12 = checkOneMandatory("CreditCard", message);
    var flag13 = checkOneMandatory("Phone", message);
    var flag14 = checkOneComboBoxMandatory("Nationality", message);
    var flag15 = checkOneMandatory("MethodOfPayment", message);
    var flag16 = checkOneMandatory("Signature", message);
    var flag17 = checkOneMandatory("ShowPrice", message);
    var flag18 = checkOneMandatory("Price", message);
    var flag19 = checkOneMandatory("Afm", message);
    var flag20 = checkOneMandatory("AcceptanceText", message);
    var flag21 = checkOneMandatory("InvoiceAfm", message);
    var flag22 = checkOneMandatory("InvoiceCompany", message);
    var flag23 = checkOneMandatory("InvoiceOccupation", message);
    var flag24 = checkOneMandatory("InvoiceCity", message);
    var flag25 = checkOneMandatory("InvoiceStreet", message);
    var flag26 = checkOneMandatory("InvoiceZipCode", message);
    var flag27 = checkOneMandatory("InvoiceCountry", message);
    var flag28 = checkOneMandatory("MemberCard", message);
    var flag29 = checkOneMandatory("CheckedItem1", message);
    var flag30 = checkOneMandatory("SendTextMessage", message);
    var flag31 = checkOneMandatory("SendPhone", message);
    var flag32 = checkOneMandatory("SendEmail", message);
    var flag33 = checkOneMandatory("SendLetter", message);
    var flag34 = checkOneMandatory("CheckAllAds", message);
    var flag35 = checkOneMandatory("Street", message);
    var flag36 = checkOneMandatory("Arrival", message);
    var flag37 = checkOneMandatory("Departure", message);
    var flag38 = checkOneMandatory("Mobile", message);

  
    var flag39 = checkOneMandatory("FreeText2", message);
    var flag40 = checkOneMandatory("FreeText3", message);
    var flag41 = checkOneMandatory("FreeText4", message);
    var flag42 = checkOneMandatory("FreeText5", message);
    var flag43 = checkOneMandatory("FreeText6", message);
    var flag44 = checkOneMandatory("FreeText7", message);
    var flag45 = checkOneMandatory("FreeText8", message);
    var flag46 = checkOneMandatory("FreeText9", message);
    var flag47 = checkOneMandatory("FreeText10", message);
    var flag48 = checkOneMandatory("FreeText11", message);
    var flag49 = checkOneMandatory("FreeText12", message);
    var flag50 = checkOneMandatory("FreeText1", message); 
 

    if (flag1 == false || flag2 == false || flag3 == false || flag4 == false || flag5 == false || flag6 == false || flag7 == false || flag8 == false || flag9 == false || flag10 == false ||
        flag11 == false || flag12 == false || flag13 == false || flag14 == false || flag15 == false || flag16 == false || flag17 == false || flag18 == false || flag19 == false || flag20 == false ||
        flag21 == false || flag22 == false || flag23 == false || flag24 == false || flag25 == false || flag26 == false || flag27 == false || flag28 == false || flag29 == false || flag30 == false
        || flag31 == false || flag32 == false || flag33 == false || flag34 == false || flag35 == false || flag36 == false || flag37 == false || flag38 == false

        || flag39 == false || flag40 == false || flag41 == false || flag42 == false
        || flag43 == false || flag44 == false || flag45 == false || flag46 == false || flag47 == false || flag48 == false || flag49 == false || flag50 == false 
    ) {
        return false;
    }
    else {
        return true;
    }
}

function initMadatoriesCheckboxes() {
    var inputCheckedItem1 = SignalRHandler.customer()[tmp1.customerIndex()].CheckedItem1Value;
    var flag1 = checkMandatoryCheckBoxes('CheckedItem1Value', inputCheckedItem1);
    var inputCheckedItem2 = SignalRHandler.customer()[tmp1.customerIndex()].CheckedItem2Value;
    var flag2 = checkMandatoryCheckBoxes('CheckedItem2Value', inputCheckedItem2);
    var inputCheckedItem3 = SignalRHandler.customer()[tmp1.customerIndex()].CheckedItem3Value;
    var flag3 = checkMandatoryCheckBoxes('CheckedItem3Value', inputCheckedItem3);
    var inputCheckedItem4 = SignalRHandler.customer()[tmp1.customerIndex()].CheckedItem4Value;
    var flag4 = checkMandatoryCheckBoxes('CheckedItem4Value', inputCheckedItem4);
    var inputCheckedItem5 = SignalRHandler.customer()[tmp1.customerIndex()].CheckedItem5Value;
    var flag5 = checkMandatoryCheckBoxes('CheckedItem5Value', inputCheckedItem5);
    var inputCheckedItem6 = SignalRHandler.customer()[tmp1.customerIndex()].CheckedItem6Value;
    var flag6 = checkMandatoryCheckBoxes('CheckedItem6Value', inputCheckedItem6);
    var inputCheckedItem7 = SignalRHandler.customer()[tmp1.customerIndex()].CheckedItem7Value;
    var flag7 = checkMandatoryCheckBoxes('CheckedItem7Value', inputCheckedItem7);
    var inputCheckedItem8 = SignalRHandler.customer()[tmp1.customerIndex()].CheckedItem8Value;
    var flag8 = checkMandatoryCheckBoxes('CheckedItem8Value', inputCheckedItem8);
    var inputCheckedItem9 = SignalRHandler.customer()[tmp1.customerIndex()].CheckedItem9Value;
    var flag9 = checkMandatoryCheckBoxes('CheckedItem9Value', inputCheckedItem9);
    var inputCheckedItem10 = SignalRHandler.customer()[tmp1.customerIndex()].CheckedItem10Value;
    var flag10 = checkMandatoryCheckBoxes('CheckedItem10Value', inputCheckedItem10);
    var inputCheckedItem11 = SignalRHandler.customer()[tmp1.customerIndex()].CheckedItem11Value;
    var flag11 = checkMandatoryCheckBoxes('CheckedItem11', inputCheckedItem11);
    var inputCheckedItem12 = SignalRHandler.customer()[tmp1.customerIndex()].CheckedItem12Value;
    var flag12 = checkMandatoryCheckBoxes('CheckedItem12Value', inputCheckedItem12);
    var inputCheckedItem13 = SignalRHandler.customer()[tmp1.customerIndex()].CheckedItem13Value;
    var flag13 = checkMandatoryCheckBoxes('CheckedItem13Value', inputCheckedItem13);
    var inputCheckedItem14 = SignalRHandler.customer()[tmp1.customerIndex()].CheckedItem14Value;
    var flag14 = checkMandatoryCheckBoxes('CheckedItem14Value', inputCheckedItem14);
    var inputCheckedItem15 = SignalRHandler.customer()[tmp1.customerIndex()].CheckedItem15Value;
    var flag15 = checkMandatoryCheckBoxes('CheckedItem15', inputCheckedItem15);
    var inputCheckedItem16 = SignalRHandler.customer()[tmp1.customerIndex()].CheckedItem16Value;
    var flag16 = checkMandatoryCheckBoxes('CheckedItem16Value', inputCheckedItem16);
    var inputCheckedItem17 = SignalRHandler.customer()[tmp1.customerIndex()].CheckedItem17Value;
    var flag17 = checkMandatoryCheckBoxes('CheckedItem17Value', inputCheckedItem17);
    var inputCheckedItem18 = SignalRHandler.customer()[tmp1.customerIndex()].CheckedItem18Value;
    var flag18 = checkMandatoryCheckBoxes('CheckedItem18Value', inputCheckedItem18);
    var inputCheckedItem19 = SignalRHandler.customer()[tmp1.customerIndex()].CheckedItem19Value;
    var flag19 = checkMandatoryCheckBoxes('CheckedItem19Value', inputCheckedItem19);
    var inputCheckedItem20 = SignalRHandler.customer()[tmp1.customerIndex()].CheckedItem20Value;
    var flag20 = checkMandatoryCheckBoxes('CheckedItem20Value', inputCheckedItem20);
    var inputSendTextMessage = SignalRHandler.customer()[tmp1.customerIndex()].SendTextMessageValue;
    var flag21 = checkMandatoryCheckBoxes('SendTextMessageValue', inputSendTextMessage);
    var inputSendPhoneValue = SignalRHandler.customer()[tmp1.customerIndex()].SendPhoneValue;
    var flag22 = checkMandatoryCheckBoxes('SendPhoneValue', inputSendPhoneValue);
    var inputSendEmailValue = SignalRHandler.customer()[tmp1.customerIndex()].SendEmailValue;
    var flag23 = checkMandatoryCheckBoxes('SendEmailValue', inputSendEmailValue);
    var inputSendLetterValue = SignalRHandler.customer()[tmp1.customerIndex()].SendLetterValue;
    var flag24 = checkMandatoryCheckBoxes('SendLetterValue', inputSendLetterValue);
    var inputSendTextMessagesValue = SignalRHandler.customer()[tmp1.customerIndex()].SendTextMessagesValue;
    var flag25 = checkMandatoryCheckBoxes('SendTextMessagesValue', inputSendTextMessagesValue);
    var inputCheckAllAds = SignalRHandler.customer()[tmp1.customerIndex()].CheckAllAds;
    var flag26 = checkMandatoryCheckBoxes('CheckAllAds', inputCheckAllAds);

    if (flag1 == false || flag2 == false || flag3 == false || flag4 == false || flag5 == false || flag6 == false || flag7 == false || flag8 == false || flag9 == false || flag10 == false ||
        flag11 == false || flag12 == false || flag13 == false || flag14 == false || flag15 == false || flag16 == false || flag17 == false || flag18 == false || flag19 == false || flag20 == false ||
        flag21 == false || flag22 == false || flag23 == false || flag24 == false || flag25 == false || flag26 == false) {
        return false;
    }
    else {
        return true;
    }
};

function checkOneMandatory(name, message) {
    var elementValue;
    var element;
    var isRequiredFlag = false;
    var tabElement = document.getElementsByClassName("tab")[tmp1.customerIndex()];
    element = tabElement.getElementsByClassName("textBoxesClass")[name];
    if (element) {
        elementValue = element.value;
        isRequiredFlag = element.hasAttribute("required");
    }
    element = tabElement.getElementsByClassName("datePickerElement")[name + "_" + tmp1.customerIndex()];
    if (element) {
        elementValue = element.value;
        isRequiredFlag = element.hasAttribute("required");
    }
    if (elementValue) {
        return true;
    }
    else {
        if (isRequiredFlag) {
            if (message !== "noalerts") {
                iziToast.error({
                    title: name,
                    message: name + ' is Required!',
                    timeout: 2000
                });
            }
            return false;
        }
        else {
            return true;
        }
    }
    return true;
}

function GetDataFromDictionary() {
    var finalGroup = localStorage.ConfigGroupName + "-" + localStorage.ConfigHotelName;
    $.ajax({
        url: "/FC/GetFromDictionary?HotelId=" + localStorage.ConfigHotelName + "&Group=" + finalGroup,
        cache: false,
        type: "GET",
        crossdomain: false,
        dataType: "json",
        ContentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data !== undefined && data !== null) {
                tmp1.String1Tmp = data.String1;
                if (tmp1.String1Tmp) {
                    SignalRHandler.String1Encrypted(data.String1Encrypted);
                    SignalRHandler.InvokeFromMobile(tmp1.String1Tmp);
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

function checkMandatoryCheckBoxes(itemname, input) {
    if (document.getElementById(itemname) !== null && document.getElementById(itemname) !== undefined) {
        if (document.getElementById(itemname).hasAttribute("required")) {
            if (input == true) {
                return true;
            }
            else {
                iziToast.error({
                    title: 'Required Fields',
                    message: 'Please enter all required fields!',
                    timeout: 2000
                });
                return false;
            }
        }
        return true;
    }
}

function UpdateLanguageCheckBox(field) {
    var checkBoxId = field + "lbl";
    var checkBoxElements = document.getElementsByClassName("labelLanguageChange");
    ko.utils.arrayForEach(checkBoxElements, function (cb) {
        if (cb.id == checkBoxId && LanguageHandler.selectedDictionary() !== null) {
            cb.innerHTML = "<span>" + LanguageHandler.selectedDictionary()[field] + "</span>";
        }
    });
}

function InitializeDatePickers() {
    var x = document.getElementsByClassName("tab");
    var elements = x[tmp1.customerIndex()].getElementsByClassName("datePickerElement");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].id.includes("_")) {
            elements[i].id = elements[i].id.substring(0, elements[i].id.indexOf('_'));
        }
        elements[i].id = elements[i].id + '_' + tmp1.customerIndex();
    }
    if (elements != null) {
        ko.utils.arrayForEach(elements, function (e) {
            if (e.id !== undefined && e.id !== null) {
                var elementId = e.id;
                $("#" + elementId).datepicker({
                    startDate: "01/01/1900",
                    endDate: "01/01/2050",
                    format: "dd/mm/yyyy"
                }).on('hide', function (e) {
                    SignalRHandler.customer()[tmp1.customerIndex()].DateOfBirth = moment(e.date, "DD/MM/YYYY").format();
                });
            }
        });
    }
};

function GetSelectedValue(data, controlName) {
    if (data && controlName == "Country") {
        SignalRHandler.customer()[tmp1.customerIndex()].CountryId = data.Country;
        ko.utils.arrayForEach(ResourceHandler.Country(), function (country) {
            if (country.Id == data.Country) {
                SignalRHandler.customer()[tmp1.customerIndex()].Country = country.Description;
            }
        });
    }
}

function GetSelectedLanguage() {
    var e = document.getElementById("availableLanguages");
    if (e !== null && e.selectedIndex >= 0) {
        if (SignalRHandler.customer() != null) {
            var selectedLng = e.options[e.selectedIndex].value;
            LanguageHandler.ChangeLanguage(selectedLng);
            SignalRHandler.customer()[0].LanguageCode = selectedLng;
            var languageId = 0;
            ko.utils.arrayForEach(LanguageHandler.availableLanguages(), function (lang) {
                if (lang.Code == selectedLng) {
                    languageId = lang.Id;
                }
            });
            ResourceHandler.GetTitles(languageId);
        }
        else {
            var selectedLng = e.options[e.selectedIndex].value;
            LanguageHandler.ChangeLanguage(selectedLng);
            var languageId = 0;
            ko.utils.arrayForEach(LanguageHandler.availableLanguages(), function (lang) {
                if (lang.Code == selectedLng) {
                    languageId = lang.Id;
                }
            });
            ResourceHandler.GetTitles(languageId);
        }
    }
}

function GetSelectedAnrede() {
    tmp1.AnredeInterval = setInterval(function () {
        if (ResourceHandler.titles().length > 0) {
            clearInterval(tmp1.AnredeInterval);
            var e = document.getElementById("inputAnrede");
            if (e !== null && e.selectedIndex >= 0) {
                var selectedTitle = e.value;
                var tableId = parseFloat(selectedTitle);
                var selectedTitleModel = ko.utils.arrayFirst(ResourceHandler.titles(), function (t) {
                    return t.Id == tableId;
                });
                if (selectedTitleModel !== null && selectedTitleModel !== undefined) {
                    localStorage.Description = selectedTitleModel.Description2;
                    localStorage.ShortName = selectedTitleModel.Description;
                    localStorage.TableId = selectedTitleModel.Id;
                    localStorage.Title = selectedTitleModel.Title;
                    SignalRHandler.customer()[tmp1.customerIndex()].anrede = selectedTitleModel.Description;
                }
            }
        }
    }, 100);
}

function toAppercaseElements() {
    var tabElement = document.getElementsByClassName("tab")[tmp1.customerIndex()];
    var uppercaseElements = tabElement.getElementsByClassName("toUp");
    ko.utils.arrayForEach(uppercaseElements, function (cb) {
        var temp = cb.value.toUpperCase();
        SignalRHandler.customer()[tmp1.customerIndex()][cb.id] = temp;
    });
}

