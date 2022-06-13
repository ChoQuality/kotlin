var subUri = '/0'
var readEndPoint ='/list'
var customPopup, openWin, customRegExp;
var data;
window.addEventListener('DOMContentLoaded', function(){
    customPopup = new CustomPopup();
    settingtRegButton('.marker-reg.list', '.marker-reg.reg');
    settingChangeID(document.querySelectorAll('td input')[6],'change');
    settingCheckID();
    settingFindSystem();
    setCheckPassword();
    customRegExp = new CutomRegExp();
    customRegExp.passwordCheck(document.getElementById('password_input'),/(?=^[\S]{8,15}$)(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&+=])/);
    customRegExp.idCheck(document.getElementById('id_input'),/(?=^[\S]{5,20}$)(?=.*[0-9a-zA-Z_-])/);
});
function settingtRegButton(list, reg) {
    document.querySelector(list).addEventListener('click', function (event) {
        customPopup.setOn("등록 취소 확인","작성을 취소 하시겠습니까?",callbackCancelCancel,callbackCancelConfirm);
    });
    document.querySelector(reg).addEventListener('click', function (event) {

        var green = document.querySelectorAll('td')[4].querySelector('span.bbs_explan.em_green');
        var red = document.querySelectorAll('td')[4].querySelector('span.bbs_explan.em_red');
        var blue = document.querySelectorAll('td')[4].querySelector('span.bbs_explan.em_blue');

        var green_pw = document.querySelectorAll('td')[5].querySelector('span.bbs_explan.em_green');
        var red_pw = document.querySelectorAll('td')[5].querySelector('span.bbs_explan.em_red');
        var blue_pw = document.querySelectorAll('td')[5].querySelector('span.bbs_explan.em_blue');

        if( green.classList.contains('off') == true
            || red.classList.contains("off") == false
            || blue.classList.contains("off") == false){
            red.classList.contains("off") ? true : red.classList.add('off');
            blue.classList.contains("off") ? blue.classList.remove('off') : true;
            green.classList.contains("off") ? true : green.classList.add('off');

            setTimeout(function(){
                document.querySelectorAll('td')[4].querySelector('input').focus();
            },0);

            return false;
        }

        if( green_pw.classList.contains('off') == true
            || red_pw.classList.contains("off") == false
            || blue_pw.classList.contains("off") == false){
            red_pw.classList.contains("off") ? true : red_pw.classList.add('off');
            blue_pw.classList.contains("off") ? blue_pw.classList.remove('off') : true;
            green_pw.classList.contains("off") ? true : green_pw.classList.add('off');
            setTimeout(function(){
                document.querySelectorAll('td')[5].querySelector('input').focus();
            },0);
            return false;
        }

        var result = true;
        data = new regPage().make();
        for(var [key, value] of data){

            if(result == false)
                break;

            if(value == ''){
                switch (key){
                    case 'NM':result = inputAlert('성함을 입력해 주세요', 0);break;
                    case 'CLSF':result = inputAlert('직급을 입력해 주세요', 1);break;
                    case 'DEPT':result = inputAlert('부서를 입력해 주세요', 2);break;
                    case 'TELNO':result = inputAlert('연락처를 입력해 주세요', 3);break;
                    case 'MNGR_ID':result = inputAlert('아이디를 입력해 주세요', 4);break;
                    case 'PASSWORD':result = inputAlert('비밀번호를 입력해 주세요', 5);break;
                    case 'SYS_NM':result = inputAlert('담당 업무 시스템을 입력해 주세요', 7);break;
                    case 'SYS_CODE':result = inputAlert('담당 업무 시스템을 입력해 주세요', 8);break;
                    default:break;
                }
            }
        }

        if(result){
            customPopup.setOn("등록 확인","작성된 내용으로 회원 등록하시겠습니까?",callbackConfirmCancel,callbackConfirmConfirm);
        }
    });

    function inputAlert(msg, index){
        alert(msg);
        setTimeout(function(){
            document.querySelectorAll('td')[index].querySelector('input').focus();
        },0);
        return false;
    }



};
function settingChangeID(button, event){

    this.function = function (){
        var green = document.querySelectorAll('td')[4].querySelector('span.bbs_explan.em_green');
        var red = document.querySelectorAll('td')[4].querySelector('span.bbs_explan.em_red');
        var blue = document.querySelectorAll('td')[4].querySelector('span.bbs_explan.em_blue');

        red.classList.contains("off") ? true : red.classList.add('off');
        green.classList.contains("off") ? true : green.classList.add('off');
        blue.classList.contains("off") ? blue.classList.remove('off') : true;
    }


    button.addEventListener(event, this.function);
}
function settingCheckID(){
    var green = document.querySelectorAll('td')[4].querySelector('span.bbs_explan.em_green');
    var red = document.querySelectorAll('td')[4].querySelector('span.bbs_explan.em_red');
    var blue = document.querySelectorAll('td')[4].querySelector('span.bbs_explan.em_blue');

    this.function = function (){
        var data = {};
        data.MNGR_ID =(document.querySelectorAll('td input')[6].value);

        if(data.MNGR_ID.length != 0){
            var path=window.location.pathname + '/checkID';
            var formData = new FormData();
            formData.enctype ="multipart/form-data";
            formData.append('request', JSON.stringify(data));
            common.setInfoAsyncAjax("POST",path, formData);
            common.processFileAsyncAjax([callbackSuccess], [callbackFail]);
        } else {
            alert('아이디를 입력해 주세요.');
            setTimeout(function(){
                document.querySelectorAll('td')[4].querySelector('input').focus();
            },0);
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
                green.classList.contains("off") ? true:green.classList.add('off');
            }
        } else {
            window.location.reload();
        }
    }
    function callbackFail(res){}
    reg.tempEvent('button.bbs_btn.type06',0,'click',this.function);
}
function settingFindSystem(){
    this.function = function (){
        var path = window.location.pathname+"/findSYS";
        openWin = window.open(path, "findSYS", "status=0,title=0,height=700,width=1200,scrollbars=1");
        /*var mapForm = document.createElement("form");
        mapForm.action = path;
        mapForm.target = "findSYS";
        mapForm.method = "GET"; // or "post" if appropriate
        document.body.appendChild(mapForm);
        var map =

        if (map) {
            mapForm.submit();
        }*/
    }
    reg.tempEvent('button.bbs_btn.type06',1,'click',this.function);
}
function setCheckPassword(){

    var green = document.querySelectorAll('td')[5].querySelector('span.bbs_explan.em_green');
    var red = document.querySelectorAll('td')[5].querySelector('span.bbs_explan.em_red');
    var blue = document.querySelectorAll('td')[5].querySelector('span.bbs_explan.em_blue');

    var originPassword=document.querySelectorAll('td input[type="password"]')[0];
    var checkPassword=document.querySelectorAll('td input[type="password"]')[1];
    originPassword.addEventListener('change', function (){
        if(originPassword.value == ''){
            red.classList.contains("off") ? true : red.classList.add('off');
            green.classList.contains("off") ? true:green.classList.add('off');
            blue.classList.contains("off") ? blue.classList.remove('off'):true;
            return false;
        }
        if(originPassword.value != checkPassword.value){
            red.classList.contains("off") ? red.classList.remove('off'):true;
            blue.classList.contains("off") ? true : blue.classList.add('off');
            green.classList.contains("off") ? true:green.classList.add('off');
            checkPassword.value ='';
        }
    })
    checkPassword.addEventListener('change', function (){
        if(checkPassword.value == ''){
            red.classList.contains("off") ? true : red.classList.add('off');
            green.classList.contains("off") ? true:green.classList.add('off');
            blue.classList.contains("off") ? blue.classList.remove('off'):true;
            return false;
        }
        if(originPassword.value != checkPassword.value){
            red.classList.contains("off") ? red.classList.remove('off'):true;
            blue.classList.contains("off") ? true : blue.classList.add('off');
            green.classList.contains("off") ? true:green.classList.add('off');
            checkPassword.value ='';
        } else{
            red.classList.contains("off") ? true : red.classList.add('off');
            blue.classList.contains("off") ? true: blue.classList.add('off');
            green.classList.contains("off") ? green.classList.remove('off') : true;
        }
    })
}

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

    formData.append('request', JSON.stringify(Object.fromEntries(data)));
    common.setInfoAsyncAjax("POST",path, formData);
    common.processFileAsyncAjax([callbackSuccessOnLoad], [callbackFailOnLoad]);

    function callbackSuccessOnLoad(res) {
        if (res.indexOf('<!DOCTYPE html>') == -1) {
            if ("SUCCESS" == JSON.parse(res).header.state) {
                /*alert('저장완료');
                openWin.window.location.reload();*/
                var path = window.location.pathname;
                path = path.substring(0, path.indexOf(subUri));
                path = path + subUri + readEndPoint;
                window.location.href = path;
            } else {
                var target = document.getElementById('modal-permission-exception');
                common.fade(target);
            }
        } else {
            window.location.reload();
        }
    }
    function callbackFailOnLoad(res) {
        console.log(res);
    }
};

function receiveSystemData(name,code){
    document.querySelector('tr input[id="parent_SYS_name"]').value = name;
    document.querySelector('tr input[id="parent_SYS_code"]').value = code;
}

