function ReservationInfoModel(model) {
    let reservationInfoModel = this;
    reservationInfoModel.FirstName = model !== undefined && model !== null ? model.FirstName : null;
    reservationInfoModel.LastName = model !== undefined && model !== null ? model.LastName : null;
    reservationInfoModel.Arrival = model !== undefined && model !== null ? model.Arrival : moment().format();
    reservationInfoModel.Departure = model !== undefined && model !== null ? model.Departure : moment().format();
};

function PostReservationInfoModel(hotelId, reservationId, reservationInfo) {
    let postReservationInfo = this;
    postReservationInfo.hotelId = hotelId;
    postReservationInfo.reservationId = reservationId;
    postReservationInfo.reservationInfo = reservationInfo;
};

function ReservationResultModel(model) {
    let reservationResult = this;
    reservationResult.encryptedReservationId = model !== undefined && model !== null ? model.encryptedReservationId : null;
};