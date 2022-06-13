window.onload = function () {
    setMainEvent();
    initPage();
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
}

function initPage() {
    if(getCookie("USERNAME=") != ''){
        MAIN.CHECKBOX.checked=true;
        document.querySelector('input[name=username]').value = getCookie("USERNAME=");
    }
}

function setCookie(cookieName, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    document.cookie = cookieName + escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toGMTString());
}

function deleteCookie(cookieName) {
    document.cookie = cookieName+"=;"+"Max-Age=-1;";
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