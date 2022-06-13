window.onload = function () {
    setQRImg();
    document.getElementById("qrResResultBtn").addEventListener("click",setQRResult);
};
function setQRImg(){
    var path = window.location.pathname;
    common.setInfoAsyncAjax("POST", path, {"data": "efda467d2d32476eadec"});
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
function setQRResult(){
    var path = "/qr/mpmResult";
    common.setInfoAsyncAjax("POST", path, {"data": "efda467d2d32476eadec"});
    common.processAsyncAjax('application/json', [callbackSuccessDomLoad], [callbackFailDomLoad]);
    function callbackSuccessDomLoad(res) {
        console.log(JSON.parse(res).body.data.ipAddr);
        var path = JSON.parse(res).body.data.ipAddr;
        common.setInfoAsyncAjax("GET", path, {});
        common.processAsyncAjaxTest('application/json', [callbackSuccess], [callbackFail]);

    }
    function callbackFailDomLoad(res) {
        console.log(res);
    }
    function callbackSuccess(res) {
        console.log(JSON.parse(res));
        document.getElementById('customIHID').value = JSON.parse(res).ihidnum;
        document.getElementById('customCI').value = JSON.parse(res).ci;
    }
    function callbackFail(res) {
        console.log(res);
    }
}
