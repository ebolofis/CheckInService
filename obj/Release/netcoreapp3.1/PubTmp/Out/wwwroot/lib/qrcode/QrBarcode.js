
function InfoMessage() {

    iziToast.info({
        title: 'Info',
        message: 'Please Hold your device over the QR Code so that it’s clearly visible within your smartphone’s screen',
        backgroundColor: '#ac9766',
        position: 'bottomCenter',
        drag: true,
    });
}




function WelcomeToFastCheckIn() {
    iziToast.info({
        backgroundColor: '#B0E0E6',
        drag: true,
        icon: 'fas fa-info-circle',
        progressBar: true,
        progressBarColor: 'green',
        balloon: true,
        close: false,
        closeOnEscape: true,
        closeOnClick: true,
        maxWidth: 250,
        imageWidth: 50,
        zindex: 1000,
        iconText: ' Welcome ',
        iconColor: 'Black',
    });

}



function PleaseSignAboveTheLine() {
    iziToast.info({

        //message: 'Please Sign Above the Line',
        backgroundColor: '#B0E0E6',

        drag: true,
        icon: 'fas fa-file-signature',
        progressBar: true,
        progressBarColor: 'green',
        balloon: true,
        close: false,
        closeOnEscape: true,
        closeOnClick: true,
        maxWidth: 250,
        imageWidth: 50,
        zindex: 1000,
        iconText: '   Please Sign Above the Line',
        iconColor: 'Black',
    });

}


function qrfetchsucess() {
Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Qr Code was fetched successfully',
    showConfirmButton: false,
    timer: 1500
})
}



function autoCloseSpinnerModal(parameters) {
    let timerInterval
    Swal.fire({
        title: 'Auto close alert!',
        html: 'I will close in <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,
        onBeforeOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                    const b = content.querySelector('b')
                    if (b) {
                        b.textContent = Swal.getTimerLeft()
                    }
                }
            }, 100)
        },
        onClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
    })

}

