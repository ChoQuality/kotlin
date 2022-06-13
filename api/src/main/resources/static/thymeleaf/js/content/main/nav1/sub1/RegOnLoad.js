var subUri = '/1'
var readEndPoint ='/list'
var customPopup, openWin;
window.addEventListener('DOMContentLoaded', function(){
    customPopup = new CustomPopup();
    settingtRegButton('.marker-reg.list', '.marker-reg.reg');
    settingCheckSYS(document.querySelectorAll('button.bbs_btn.type06')[0],'click','reg','/checkMapping');
    settingChangeNumber(document.querySelectorAll('td input')[1], 'change');
});

function settingChangeNumber(button, event){

    this.function = function (){
        var green = document.querySelectorAll('td')[1].querySelector('span.bbs_explan.em_green');
        var red = document.querySelectorAll('td')[1].querySelector('span.bbs_explan.em_red');
        var blue = document.querySelectorAll('td')[1].querySelector('span.bbs_explan.em_blue');

        red.classList.contains("off") ? true : red.classList.add('off');
        green.classList.contains("off") ? true : green.classList.add('off');
        blue.classList.contains("off") ? blue.classList.remove('off') : blue.classList.add('off');
    }


    button.addEventListener(event, this.function);
}

function settingCheckSYS(button,event,uri,endPoint){
    var green = document.querySelectorAll('td')[1].querySelector('span.bbs_explan.em_green');
    var red = document.querySelectorAll('td')[1].querySelector('span.bbs_explan.em_red');
    var blue = document.querySelectorAll('td')[1].querySelector('span.bbs_explan.em_blue');

    this.function = function (){
        var data = {};
        data.SEND_PHONE = document.querySelectorAll('td input')[1].value;

        if(data.SEND_PHONE.length != 0){
            var path=window.location.pathname+endPoint;
            var formData = new FormData();
            formData.enctype ="multipart/form-data";
            formData.append('request', JSON.stringify(data));
            common.setInfoAsyncAjax("POST",path, formData);
            common.processFileAsyncAjax([callbackSuccess], [callbackFail]);
        } else {
            alert('시스템 코드를 입력해 주세요.');
        }
    }
    function callbackSuccess(res){
        if (res.indexOf('<!DOCTYPE html>') == -1) {
            if ("SUCCESS" == JSON.parse(res).header.state) {
                red.classList.contains("off") ? true : red.classList.add('off');
                blue.classList.contains("off") ? true : blue.classList.add('off');
                green.classList.contains("off") ? green.classList.remove('off'):green.classList.add('off');
            } else {
                red.classList.contains("off") ? red.classList.remove('off') : red.classList.add('off');
                blue.classList.contains("off") ? true : blue.classList.add('off');
                green.classList.contains("off") ? true:green.classList.add('off');
            }
        } else {
            window.location.reload();
        }
    }
    function callbackFail(res){}
    button.addEventListener(event,this.function);
}


function settingtRegButton(list, reg) {
    document.querySelector(list).addEventListener('click', function (event) {
        customPopup.setOn("매핑 취소 확인","매핑을 취소 하시겠습니까?",callbackCancelCancel,callbackCancelConfirm);
    });
    document.querySelector(reg).addEventListener('click', function (event) {
        customPopup.setOn("매핑 확인","해당 내용으로 매핑 하시겠습니까?",callbackConfirmCancel,callbackConfirmConfirm);
    });
};

function callbackCancelCancel() {
    customPopup.off();
};
function callbackCancelConfirm() {
    customPopup.off();
    var path = window.location.pathname;
    path = path.substring(0, path.indexOf(subUri));
    path = path + subUri + readEndPoint;
    window.location.href = path;
};
function callbackConfirmCancel() {
    customPopup.off();
};
function callbackConfirmConfirm() {
    customPopup.off();

    var green = document.querySelectorAll('td')[1].querySelector('span.bbs_explan.em_green');
    var red = document.querySelectorAll('td')[1].querySelector('span.bbs_explan.em_red');
    var blue = document.querySelectorAll('td')[1].querySelector('span.bbs_explan.em_blue');

    if( green.classList.contains('off') == true
        || red.classList.contains("off") == false
        || blue.classList.contains("off") == false){
        red.classList.contains("off") ? true : red.classList.add('off');
        blue.classList.contains("off") ? blue.classList.remove('off') : blue.classList.add('off');
        green.classList.contains("off") ? true : green.classList.add('off');
        return false;
    }

    var path=window.location.pathname;
    var formData = new FormData();
    formData.enctype ="multipart/form-data";
    var data = make();
    if(data !== false){
        formData.append('request', JSON.stringify(data));
        common.setInfoAsyncAjax("POST",path, formData);
        common.processFileAsyncAjax([callbackSuccessOnLoad], [callbackFailOnLoad]);
    }
    function callbackSuccessOnLoad(res) {
        if (res.indexOf('<!DOCTYPE html>') == -1) {
            if ("SUCCESS" == JSON.parse(res).header.state) {
                alert('매핑 완료');
                var path = window.location.pathname;
                path = path.substring(0, path.indexOf(subUri));
                path = path + subUri + readEndPoint;
                window.location.href = path;
            } else {
                alert("매핑에 실패하였습니다.");
            }
        } else {
            window.location.reload();
        }
    }
    function callbackFailOnLoad(res) {
        console.log(res);
    }

    function make() {
        this.data = {
            NATION_CODE:document.querySelectorAll('td input')[0].value,
            SEND_PHONE:document.querySelectorAll('td input')[1].value,
            SEND_NAME:document.querySelectorAll('td input')[2].value
        }
        if(this.data.NATION_CODE == '' || this.data.SEND_PHONE == ''|| this.data.SEND_NAME == ''){
            alert('빈값이 존재 합니다.');
            return false;
        }
        return this.data;
    }
};



function receiveSystemData(name,code){
    document.querySelector('tr input[id="parent_SYS_name"]').value = name;
    document.querySelector('tr input[id="parent_SYS_code"]').value = code;
}
