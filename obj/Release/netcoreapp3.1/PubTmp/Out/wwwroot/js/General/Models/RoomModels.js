function RoomStatusModel(model) {
    let roomStatus = this;
    roomStatus.RoomId = model !== undefined && model !== null ? model.RoomId : 0;
    roomStatus.CleanStatus = ko.observable(model !== undefined && model !== null ? model.CleanStatus : hygieneStatusEnumerator.Clean);
    roomStatus.OccupationStatus = ko.observable(model !== undefined && model !== null ? model.OccupationStatus : occupationStatusEnumerator.Vacant);
    roomStatus.berecht = model !== undefined && model !== null ? model.berecht : 0;//
    roomStatus.lgb0 = model !== undefined && model !== null ? model.lgb0 : 0;//
    roomStatus.lgb1 = model !== undefined && model !== null ? model.lgb1 : 0;//
    roomStatus.lgb2 = model !== undefined && model !== null ? model.lgb2 : 0;//
    roomStatus.lgb3 = model !== undefined && model !== null ? model.lgb3 : 0;//
    roomStatus.lgb4 = model !== undefined && model !== null ? model.lgb4 : 0;//
    roomStatus.lgb5 = model !== undefined && model !== null ? model.lgb5 : 0;//
    roomStatus.lgb6 = model !== undefined && model !== null ? model.lgb6 : 0;//
    roomStatus.lgb7 = model !== undefined && model !== null ? model.lgb7 : 0;//
    roomStatus.lgb8 = model !== undefined && model !== null ? model.lgb8 : 0;//
    roomStatus.lgb9 = model !== undefined && model !== null ? model.lgb9 : 0;//
    roomStatus.nonfree = model !== undefined && model !== null ? model.nonfree : 0;//
    roomStatus.oosdate = model !== undefined && model !== null ? model.oosdate : moment().format();//
    roomStatus.oosret = model !== undefined && model !== null ? model.oosret : 0;//
    roomStatus.oosgrund = model !== undefined && model !== null ? model.oosgrund : 0;//
    roomStatus.oosgrundtext = model !== undefined && model !== null ? model.oosgrundtext : null;//
};

function PostRoomStatusModel(hotelId, updateType, roomStatus, room) {
    let postRoomStatus = this;
    postRoomStatus.hotelId = hotelId;
    postRoomStatus.updateType = updateType;
    postRoomStatus.roomStatus = roomStatus;
    postRoomStatus.room = room;
};