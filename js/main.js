var dialog = document.querySelector('dialog');
var showModalButton = document.querySelector('.show-modal');

if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}

showModalButton.addEventListener('click', function() {
    $('#uploadedFile').croppie('bind', { url: $('#aa').attr('src') });
    dialog.showModal();
});

dialog.querySelector('#close').addEventListener('click', function() {
    dialog.close();
});

function popupResult(result) {
    $('#aa').attr('src', result.src);
}

$('#savePicCropData').on('click', function (ev) {
    console.log($uploadCrop.croppie('get'));
    $uploadCrop.croppie('result', {
        type: 'base64',
        format: 'png',
        size: 'original'
    }).then(function (resp) {
        console.log("I'm here at poping");
        popupResult({
            src: resp
        });
    });
    var image = $('#aa').attr('src');
    var formData = {
        image: image
    };

});

$('#inputImage').on('change', function () { readFile(this); });

var $uploadCrop = $('#uploadedFile');

$uploadCrop.croppie({
    enableExif: true,
    viewport: {
        width: 256,
        height: 256,
        type: 'square'
    },
    enforceBoundary: true
});

function readFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();


        reader.onload = function (e) {
            $('#uploadedFile').addClass('ready');
            $uploadCrop.croppie('bind', {
                url: e.target.result,
                zoom: 1,
                points: [0, 0, 256,256 ]
            }).then(function () {
                console.log("done with binding");
            });
        }
        reader.readAsDataURL(input.files[0]);
    }
    else {
        console.log("Sorry - you're browser doesn't support the FileReader API");
    }
}
