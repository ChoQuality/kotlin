var subUri = '/reg'
var readEndPoint ='/findSYS'
var customPopup, openViewWin, customRegExp;
var data;
window.addEventListener('DOMContentLoaded', function(){
    customPopup = new CustomPopup();
    settingtRegButton('.marker-reg.list', '.marker-reg.reg');
    settingViewSYS(document.querySelectorAll('button')[0],'click','regSYS','viewSYS');
    settingChangeSYS(document.querySelectorAll('input')[1], 'change');
    settingCheckSYS(document.querySelectorAll('button')[1],'click','regSYS','checkSYS');
    customRegExp = new CutomRegExp();
    customRegExp.ipv4Check(document.getElementById('ipv4_input'),/^[0-9]{1,3}[.]+[0-9]{1,3}[.]+[0-9]{1,3}[.]+[0-9]{1,3}$/i);
});
function settingChangeSYS(button, event){

    this.function = function (event){
        var green = document.querySelectorAll('td')[1].querySelector('span.bbs_explan.em_green');
        var red = document.querySelectorAll('td')[1].querySelector('span.bbs_explan.em_red');
        var blue = document.querySelectorAll('td')[1].querySelector('span.bbs_explan.em_blue');

        red.classList.contains("off") ? true : red.classList.add('off');
        green.classList.contains("off") ? true : green.classList.add('off');
        blue.classList.contains("off") ? blue.classList.remove('off') : true;

        if(event.target.value == ''){
            red.classList.contains("off") ? true : red.classList.add('off');
            green.classList.contains("off") ? true : green.classList.add('off');
            blue.classList.contains("off") ? true : blue.classList.add('off');
        }


    }


    button.addEventListener(event, this.function);
}
function settingCheckSYS(button,event,uri,endPoint){
    var green = document.querySelectorAll('td')[1].querySelector('span.bbs_explan.em_green');
    var red = document.querySelectorAll('td')[1].querySelector('span.bbs_explan.em_red');
    var blue = document.querySelectorAll('td')[1].querySelector('span.bbs_explan.em_blue');

    this.function = function (){
        var data = {};
        data.SYS_CODE = document.querySelectorAll('td input')[1].value;

        if(data.SYS_CODE.length >= 10){
            var path=window.location.pathname;
            path = path.substring(0,path.indexOf(uri))+ endPoint;
            var formData = new FormData();
            formData.enctype ="multipart/form-data";
            formData.append('request', JSON.stringify(data));
            common.setInfoAsyncAjax("POST",path, formData);
            common.processFileAsyncAjax([callbackSuccess], [callbackFail]);
        } else {
            alert('10자리 이상의 시스템 코드를 입력해 주세요.');
            document.querySelectorAll('td input')[1].focus();
        }
    }
    function callbackSuccess(res){
        if (res.indexOf('<!DOCTYPE html>') == -1) {
            if ("SUCCESS" == JSON.parse(res).header.state) {
                red.classList.contains("off") ? true : red.classList.add('off');
                blue.classList.contains("off") ? true : blue.classList.add('off');
                green.classList.contains("off") ? green.classList.remove('off'):true;
            } else {
                red.classList.contains("off") ? red.classList.remove('off') : true;
                blue.classList.contains("off") ? true : blue.classList.add('off');
                green.classList.contains("off") ? true :green.classList.add('off');
            }
        } else {
            window.location.reload();
        }
    }
    function callbackFail(res){}
    button.addEventListener(event,this.function);
}
function settingViewSYS(button,event,uri,endPoint){
    this.function = function (){
        var path=window.location.pathname;
        path = path.substring(0,path.indexOf(uri))+ endPoint;
        openViewWin = window.open(path, "viewSYS", "status=0,title=0,height=500,width=500,scrollbars=1");
    }
    button.addEventListener(event,this.function);
}



function settingtRegButton(list, reg) {
    document.querySelector(list).addEventListener('click', function (event) {
        customPopup.setOn("등록 취소 확인","시스템 등록을 취소 하시겠습니까?",callbackCancelCancel,callbackCancelConfirm);
    });
    document.querySelector(reg).addEventListener('click', function (event) {

        var result = true;

        data = make();
        switch (''){
            case data.SYS_NM:
                result=inputAlert('업무시스템 명을 입력해 주세요.',0)
                break;
            case data.SYS_CODE:
                result=inputAlert('업무시스템 코드를 입력해 주세요.',1)
                break;
            case data.SYS_IP:
                result=inputAlert('업무시스템 IP를 입력해 주세요.',2)
                break;
            default:
                break;
        }
        var green = document.querySelectorAll('td')[1].querySelector('span.bbs_explan.em_green');
        green.classList.contains("off") ? result = false : true;


        if(result){
            customPopup.setOn("등록 확인","작성된 내용으로 시스템을 등록하시겠습니까?",callbackConfirmCancel,callbackConfirmConfirm);
        }
    });

    function make() {
        this.data = {
            SYS_NM:document.querySelectorAll('td input')[0].value,
            SYS_CODE:document.querySelectorAll('td input')[1].value,
            SYS_IP:document.querySelectorAll('td input')[2].value
        }

        return this.data;
    }

    function inputAlert(msg, index){
        alert(msg);
        setTimeout(function(){
            document.querySelectorAll('td')[index].querySelector('input').focus();
        },0);
        return false;
    }
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


    var path=window.location.pathname;
    var formData = new FormData();
    formData.enctype ="multipart/form-data";

    formData.append('request', JSON.stringify(data));
    common.setInfoAsyncAjax("POST",path, formData);
    common.processFileAsyncAjax([callbackSuccessOnLoad], [callbackFailOnLoad]);

    function callbackSuccessOnLoad(res) {
        if (res.indexOf('<!DOCTYPE html>') == -1) {
            if ("SUCCESS" == JSON.parse(res).header.state) {
                alert('등록 완료');
                var path = window.location.pathname;
                path = path.substring(0, path.indexOf(subUri));
                path = path + subUri + readEndPoint;
                window.location.href = path;
            } else {
                alert("등록에 실패하였습니다.");
            }
        } else {
            window.location.reload();
        }
    }
    function callbackFailOnLoad(res) {
        console.log(res);
    }


};


