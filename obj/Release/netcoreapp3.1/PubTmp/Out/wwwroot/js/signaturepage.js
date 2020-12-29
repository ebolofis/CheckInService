var tmp2 = this;
tmp2.Hotel = ko.observable(null);
tmp2.Loading = ko.observable(false);

var myhtml = document.querySelector("html");

var xhr = new XMLHttpRequest();
xhr.onload = function () {
    const ele = document.getElementById("contentMainForm");
};

function GetHotel() {
    $.ajax({
        url: "/FC/GetHotel?hotelId=" + localStorage.ConfigHotelName,
        cache: false,
        type: "GET",
        crossdomain: false,
        dataType: "json",
        ContentType: "application/json; charset=utf-8",
        success: function (response) {
            if (response !== undefined && response !== null) {
                let hotel = new HotelModel(response);
                tmp2.Hotel(hotel);
            } else {
                iziToast.warning({
                    title: "Warning",
                    message: "Unable to get hotel with id: " + localStorage.ConfigHotelName + "!"
                });
            }
        },
        error: function (error) {
            iziToast.error({
                title: "Error",
                message: "Unable to get hotel with id: " + localStorage.ConfigHotelName + "!"
            });
            console.log(error);
        }
    });
};

$(document).ready(function () {
    PleaseSignAboveTheLine();
    LanguageHandler.SetHotelID(localStorage.ConfigHotelName);
    LanguageHandler.SetApi(localStorage.ConfigURL);
    LanguageHandler.SetHotelID(localStorage.ConfigHotelName);
    LanguageHandler.GetTranslations();

    const url2 = localStorage.ConfigURL + 'api/Sign/PostFirstPageHtml';
    xhr.open("POST", url2);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(localStorage.f1));

    GetHotel();
});

function savehtml() {

    const element = document.getElementById("sig-canvas");
    const sign = document.getElementById('sigImage');
    const url = localStorage.ConfigURL + 'api/Sign/PostFirstPageHtml';

    html2pdf().from(element).toPdf().output('datauristring').then(function (pdfAsString) {

        localStorage.f2 = localStorage.resno + "#" + pdfAsString;
        const url2 = localStorage.ConfigURL + 'api/Sign/PostSecondPageHtml';
        const jsonString2 = JSON.stringify(localStorage.f2);
        xhr.open("POST", url2);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(jsonString2);

        var link = localStorage.ConfigURL + "ThankYou/GetSettings?hotelId=" + localStorage.ConfigHotelName;
        window.location.href = link;
        tmp2.Loading = ko.observable(false);
    });
}
var languageChoosed = setInterval(function () {
    if (LanguageHandler.availableLanguages().length > 0) {
        clearInterval(languageChoosed);
        LanguageHandler.ChangeLanguage(localStorage.GlobalLanguageCode);
    }
}, 1100);

function CancelFunction() {
    var link = localStorage.ConfigURL + "FC/GetSettings?u=" + localStorage.ConfigURL + "&g=" + localStorage.ConfigGroupName + "&h=" + localStorage.ConfigHotelName;
    window.location.href = link;
}

(function () {
    window.requestAnimFrame = (function (callback) {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimaitonFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    var canvas = document.getElementById("sig-canvas");
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#222222";
    ctx.lineWidth = 4;

    var drawing = false;
    var mousePos = {
        x: 0,
        y: 0
    };
    var lastPos = mousePos;

    canvas.addEventListener("mousedown", function (e) {
        e.preventDefault();
        drawing = true;
        lastPos = getMousePos(canvas, e);
    }, false);

    canvas.addEventListener("mouseup", function (e) {
        drawing = false;
    }, false);

    canvas.addEventListener("mousemove", function (e) {
        e.preventDefault();
        mousePos = getMousePos(canvas, e);
    }, false);

    // Add touch event support for mobile
    canvas.addEventListener("touchstart", function (e) {
        e.preventDefault();
    }, false);

    canvas.addEventListener("touchmove", function (e) {
        var touch = e.touches[0];
        var me = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(me);
    }, false);

    canvas.addEventListener("touchstart", function (e) {
        mousePos = getTouchPos(canvas, e);
        var touch = e.touches[0];
        var me = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(me);
    }, false);

    canvas.addEventListener("touchend", function (e) {
        var me = new MouseEvent("mouseup", {});
        canvas.dispatchEvent(me);
    }, false);

    function getMousePos(canvasDom, mouseEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
            x: mouseEvent.clientX - rect.left,
            y: mouseEvent.clientY - rect.top
        }
    }

    function getTouchPos(canvasDom, touchEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - rect.left,
            y: touchEvent.touches[0].clientY - rect.top
        }
    }

    function renderCanvas() {
        if (drawing) {
            ctx.moveTo(lastPos.x, lastPos.y);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
            lastPos = mousePos;
        }
    }

    // Prevent scrolling when touching the canvas
    document.body.addEventListener("touchstart", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);
    document.body.addEventListener("touchend", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);
    document.body.addEventListener("touchmove", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);

    (function drawLoop() {
        requestAnimFrame(drawLoop);
        renderCanvas();
    })();

    function clearCanvas() {
        canvas.width = canvas.width;
        var ctx = canvas.getContext("2d");
        ctx.strokeStyle = "#222222";
        ctx.lineWidth = 4;
    }

    // Set up the UI
    var sigText = document.getElementById("sig-dataUrl");
    var sigImage = document.getElementById("sig-image");
    var clearBtn = document.getElementById("sig-clearBtn");
    var submitBtn = document.getElementById("sig-submitBtn");

    clearBtn.addEventListener("click", function (e) {
        clearCanvas();
        var sigText = document.getElementById("sig-dataUrl");
        var sigImage = document.getElementById("sig-image");

        if (sigText != null)
            sigText.innerHTML = "Data URL for your signature will go here!";
        if (sigImage != null)
            sigImage.setAttribute("src", "");
    }, false);
    submitBtn.addEventListener("click", function (e) {
        tmp2.Loading = ko.observable(true);
        var dataUrl = canvas.toDataURL();
        if (dataUrl.length > 3500) {
            var dataToPost = JSON.parse(localStorage.CustomerInput);
            dataToPost.Signature = dataUrl;
            localStorage.signature = dataUrl;
            dataToPost.Status = 2;
            PostCustomer(dataToPost);
        }
        else {
            tmp2.Loading = ko.observable(false);
            clearBtn.addEventListener();
            return;
        }
    }, false);

})();


function PostCustomer(FastCheckInModel) {
    FastCheckInModel.ClientName = localStorage.ConfigGroupName;
    FastCheckInModel.User = "Android";
    var FastCheckInExtModel = {};
    FastCheckInExtModel = JSON.parse(localStorage.baseinfo);
    FastCheckInExtModel.FormFastCheckInModel = FastCheckInModel;
    $.ajax({
        url: localStorage.ConfigURL + "api/MainActions/PostFromMobile",
        cache: false,
        type: "POST",
        crossdomain: false,
        dataType: "json",
        ContentType: "application/json",
        data: FastCheckInExtModel,
        statusCode: {
            200: function () {
                savehtml();
                tmp2.Loading = ko.observable(false);
            }
        }
    }).fail(function (message) {
        if (message.status != 200) {
            tmp2.Loading = ko.observable(false);
            console.log(message);
        }
    });
};