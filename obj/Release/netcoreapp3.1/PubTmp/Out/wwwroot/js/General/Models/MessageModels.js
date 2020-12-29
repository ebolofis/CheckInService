function MessageModel(model) {
    let message = this;
    message.Id = model !== undefined && model !== null ? model.Id : 0;
    message.ReservationId = model !== undefined && model !== null ? model.ReservationId : 0;
    message.CreationDate = model !== undefined && model !== null ? model.CreationDate : moment().format();
    message.CreationTime = model !== undefined && model !== null ? model.CreationTime : null;
    message.Sender = model !== undefined && model !== null ? model.Sender : null;
    message.MessageText = model !== undefined && model !== null ? model.MessageText : null;
    message.IsSeen = ko.observable(model !== undefined && model !== null ? model.IsSeen : false);
    message.SeenDate = ko.observable(model !== undefined && model !== null ? model.SeenDate : moment().format());
    message.SeenTime = ko.observable(model !== undefined && model !== null ? model.SeenTime : null);
    message.SeenBy = ko.observable(model !== undefined && model !== null ? model.SeenBy : null);
    message.prio = model !== undefined && model !== null ? model.prio : null;//
    message.internfo = model !== undefined && model !== null ? model.internfo : 0;//
    message.smsstat = model !== undefined && model !== null ? model.smsstat : 0;//
    message.smsnumber = model !== undefined && model !== null ? model.smsnumber : null;//
    message.cloudid = model !== undefined && model !== null ? model.cloudid : 0;//
    message.cloudstat = model !== undefined && model !== null ? model.cloudstat : null;//
};

function PostMessageModel(hotelId, reservationId, message) {
    let postMessage = this;
    postMessage.hotelId = hotelId;
    postMessage.reservationId = reservationId;
    postMessage.message = message;
};

function PostMessageInfoModel(hotelId, reservationId, messageCount, lastMessageDate) {
    let postMessageInfo = this;
    postMessageInfo.hotelId = hotelId;
    postMessageInfo.reservationId = reservationId;
    postMessageInfo.Count = messageCount;
    postMessageInfo.LastMessage = lastMessageDate;
};