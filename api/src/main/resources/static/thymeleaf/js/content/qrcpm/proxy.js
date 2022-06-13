/**
 * QR-CPM(proxy mode)
 * proxy.js
 */


//{
//  "cmd": "520",
//  "cmd120Base64": "eyJjaSI6ZmFsc2UsImNtZCI6IjEyMCIsImhvc3QiOiJ3czovLzEwMy40LjQ4LjE1NDo5MDkwL3Byb3h5U2VydmVyIiwiaW1hZ2UiOiIiLCJtb2RlIjoicHJveHkiLCJwcm9maWxlIjoiIiwidHJ4Y29kZSI6IjIwMjExMjE5MDUwNjM3ODUyRDREQTI5OUEiLCJ0eXBlIjoibWlwIiwidmVyc2lvbiI6IjEuMC4wIn0",
//  "svcCode": "example.1"
//}

var TRX_CODE = '';  // 거래코드
var count = 0;

	document.addEventListener("DOMContentLoaded", function() {
		var video = document.createElement("video");		
		var canvasElement = document.getElementById("canvas");
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
	});

$(function() {

	// 응답 상태 확인 버튼 클릭시
	$('#qrResResultBtn').click(function() {
		console.log('#qrResResultBtn click');
		fnResResult(TRX_CODE);
	});

});

// QR 정보전달
function fnQrInfoRelay(qrData) {
	if((qrData || '') == '') {
		alert('QR 코드를 스캔한 데이터가 없습니다.');
		return;
	}
	let param = {
		  url: contextPath + '/example/api/start/qrcpm'
		, dataType: 'json'
		, data: JSON.stringify({
			  "cmd": "520"
			, "cmd120Base64": qrData
			, "svcCode": "example.1"
		})
		, contentType: "application/json; charset=utf-8"
		, type: 'POST'
		, success: function(data) {
			console.log(data);
			if((data.errorMsg || '') == '') {
				$('#qrResultTag').val(JSON.stringify(data));
			} else {
				alert(data.errorMsg);
			}
		}
		, error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR, textStatus, errorThrown);
		}
	};
	$.ajax(param);

}

// 응답 상태 확인
function fnResResult(trxCode) {

	let param = {
		  url: contextPath + '/qrcpm/resResult'
		, dataType: 'json'
		, data: JSON.stringify({
			  'trxCode'       :  trxCode
		})
		, contentType: "application/json; charset=utf-8"
		, type: 'POST'
		, success: function(data) {
			if((data.errorMsg || '') == '') {
				let result = data.result;
				let trxStsCodeVal = {
					  '0001': '서비스 요청'
					, '0002': 'profile 요청'
					, '0003': 'VP 검증요청'
					, '0004': 'VP 검증완료'
				};
				$('#trxCodeTag').text(result.trxCode);
				$('#trxStsCodeTag').text(trxStsCodeVal[result.trxStsCode] + '(' + result.trxStsCode + ')');
				$('#regDtTag').text(result.regDt);
				$('#imgSendDtTag').text(result.imgSendDt);
				$('#udtDtTag').text(result.udtDt || result.regDt);
			} else {
				alert(data.errorMsg);
			}
		}
		, error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR, textStatus, errorThrown);
		}
	};
	if((trxCode || '') == '') {
		alert('거래코드가 존재하지 않습니다.');
	} else {
		$.ajax(param);
	}
}