function SelectDate(element, input, toggle, startDate, fieldToChange) {
    let pickerType = pickerTypeEnumerator.Date;
    if (startDate !== null && moment(startDate).date() === 1 && moment(startDate).month() === 0 && moment(startDate).year() === 1900) {
        startDate = moment().format();
    }

    let objectToChange = SignalRHandler.customer();
    if (objectToChange !== null) {
        let dateTimePicker = new CustomDateTimePicker();
        dateTimePicker.InitializeDateTimePicker(element, input, toggle, pickerType, startDate, objectToChange, fieldToChange);
    }
    
};