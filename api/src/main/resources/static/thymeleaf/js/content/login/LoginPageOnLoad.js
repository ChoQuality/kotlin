window.onload = function () {
    setMainEvent();
    initPage();
    setQRImg();

};
function setMainEvent() {
    MAIN.CHECKBOX.addEventListener('change',function(event){
        if (event.target.checked) {
            var username = document.querySelector('input[name=username]').value;
            setCookie("USERNAME=", username, 7);
        } else {
            deleteCookie("USERNAME=");
        }
    });
    function setCookie(cookieName, value, exdays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        document.cookie = cookieName + escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toGMTString());
    }
    function deleteCookie(cookieName) {
        document.cookie = cookieName+"=;"+"Max-Age=-1;";
    }

}
function initPage() {
    if(getCookie("USERNAME=") != ''){
        MAIN.CHECKBOX.checked=true;
        document.querySelector('input[name=username]').value = getCookie("USERNAME=");
    }
    function getCookie(cookieName) {
        var startOffset = document.cookie.indexOf(cookieName);
        var endOffset;
        if(startOffset != -1){
            endOffset= document.cookie.indexOf(';',startOffset);
            if(endOffset != -1){
                return unescape(document.cookie.substring(startOffset,endOffset).split(cookieName)[1]);
            } else {
                return unescape(document.cookie.substring(startOffset).split(cookieName)[1]);
            }
        }
        return unescape('');
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
