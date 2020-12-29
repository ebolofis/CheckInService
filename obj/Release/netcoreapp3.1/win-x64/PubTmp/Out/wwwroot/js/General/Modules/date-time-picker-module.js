function CustomDateTimePicker() {
    let dateTimePicker = this;
    let dataElement = "";
    let dataInput = "";
    let dataButton = "";
    let dateTimePickerType = pickerTypeEnumerator.Date;
    let startDate = null;
    let dataToChange = null;
    let fieldToChange = "";
    let picker = null;
    let eventsAdded = false;

    dateTimePicker.InitializeDateTimePicker = function (element, input, button, pickerType, start, data, field) {
        dataElement = element;
        dataInput = input;
        dataButton = button;
        dateTimePickerType = pickerType;
        if (start === null) {
            startDate = moment().format("DD/MM/YYYY");
        }
        else {
            startDate = moment(start).format("DD/MM/YYYY");
        }
        dataToChange = data;
        fieldToChange = field;
        ShowDateTimePicker();
    };

    function ShowDateTimePicker() {
        picker = new WindowDatePicker({
            value: startDate,
            el: "#" + dataElement,
            inputEl: "#" + dataInput,
            toggleEl: "#" + dataButton,
            type: dateTimePickerType,
            dateType: "DD/MM/YYYY",
            hourType: "24",
            showButtons: true
        });
        picker.open();
        if (!eventsAdded) {
            picker.el.addEventListener("wdp.cancel", () => {
                DestroyDateTimePicker();
            });
            picker.el.addEventListener("wdp.save", () => {
                ApplyDateTime();
                DestroyDateTimePicker();
            });
            eventsAdded = true;
        }
        if (!$("#wdp-dark").is(":visible")) {
            $(".wdp-dark").draggable();
        }
    };

    function ApplyDateTime() {
        let value = picker.get().value;
        let formattedValue = moment(value, "DD/MM/YYYY").format();
        if (typeof (dataToChange[fieldToChange]) === "function") {
            dataToChange[fieldToChange](formattedValue);
        }
        else {
            dataToChange[fieldToChange] = formattedValue;
        }
    };

    function DestroyDateTimePicker() {
        if (picker !== null) {
            picker.destroy();
        }
    };

};