var TRX_CODE = '';  // 거래코드
var count = 0;

window.onload = function () {
    setQrCpm();

};
function setQrCpm(){
    var video = document.createElement("video");
    var canvasElement = document.getElementById("customQrCpm");
    var canvas = canvasElement.getContext("2d");
    var loadingMessage = document.getElementById("loadingMessage");
    var outputContainer = document.getElementById("output");
    var outputMessage = document.getElementById("outputMessage");
    var outputData = document.getElementById("outputData");
    function drawLine(begin, end, color) {
        canvas.beginPath();
        canvas.moveTo(begin.x, begin.y);
        canvas.lineTo(end.x, end.y);
        canvas.lineWidth = 4;
        canvas.strokeStyle = color;
        canvas.stroke();
    }

    // 카메라 사용시
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
        video.srcObject = stream;
        video.setAttribute("playsinline", true);      // iOS 사용시 전체 화면을 사용하지 않음을 전달
        video.play();
        requestAnimationFrame(tick);
    });


    function tick() {
        if (count == 0) {
            console.log("tick ocur")
            loadingMessage.innerText = "⌛ 스캔 기능을 활성화 중입니다."
            if(video.readyState === video.HAVE_ENOUGH_DATA) {
                loadingMessage.hidden = true;
                canvasElement.hidden = false;
                outputContainer.hidden = false;
                // 읽어들이는 비디오 화면의 크기
                canvasElement.height = video.videoHeight;
                canvasElement.width = video.videoWidth;
                canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
                var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
                var code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts : "dontInvert",
                });

                // QR코드 인식에 성공한 경우
                if(code) {
                    // 인식한 QR코드의 영역을 감싸는 사용자에게 보여지는 테두리 생성
                    drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF0000");
                    drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF0000");
                    drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF0000");
                    drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF0000");
                    outputMessage.hidden = true;
                    outputData.parentElement.hidden = false;
                    // QR코드 메시지 출력
                    outputData.innerHTML = code.data;
                    outputData2.innerHTML = atob(code.data); //base64에서 디코드된 문자열
                    TRX_CODE = JSON.parse(atob(code.data)).trxCode;
                    // return을 써서 함수를 빠져나가면 QR코드 프로그램이 종료된다.
                    // return;

                    fnQrInfoRelay(code.data); // QR 정보전달
                    count = 1;
                }

                // QR코드 인식에 실패한 경우
                else {
                    outputMessage.hidden = false;
                    outputData.parentElement.hidden = true;
                }
            }
            requestAnimationFrame(tick);
        }}
    function fnQrInfoRelay(qrData) {
        if((qrData || '') == '') {
            alert('QR 코드를 스캔한 데이터가 없습니다.');
            return;
        }

        var path = window.location.pathname;
        common.setInfoAsyncAjax("POST", path, {
            "cmd": "520"
            , "cmd120Base64": qrData
            , "svcCode": "example.1"
        });
        common.processAsyncAjax('application/json; charset=utf-8', [callbackSuccessDomLoad], [callbackFailDomLoad]);
        function callbackSuccessDomLoad(res) {
            console.log(JSON.parse(res));
        }
        function callbackFailDomLoad(res) {
            console.log(res);
        }
    }
}


function setQRImg(){
    var path = window.location.pathname;
    common.setInfoAsyncAjax("POST", path, {});
    common.processAsyncAjax('application/json', [callbackSuccessDomLoad], [callbackFailDomLoad]);
    function callbackSuccessDomLoad(res) {
        console.log(JSON.parse(res).body.data.qrImage);
        var qrImage = JSON.parse(res).body.data.qrImage;
        document.getElementById('customQr').src = URL.createObjectURL(makeFile(qrImage));
        function makeFile(content) {
            var byteCharacters = atob(content);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            var file = new Blob([byteArray], { type:'image/png' });
            return file;
        }
    }
    function callbackFailDomLoad(res) {
        console.log(res);
    }
}
