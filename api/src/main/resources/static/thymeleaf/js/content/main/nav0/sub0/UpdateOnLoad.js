var subUri = '/0'
var readEndPoint ='/list'
var createEndPoint ='/reg'
var updateEndPoint ='/update'
var customPopup, openWin;
var data;
window.addEventListener('DOMContentLoaded', function(){
    customPopup = new CustomPopup();
    settingtRegButton('.marker-reg.list', '.marker-reg.reg');
    settingFindSystem(document.querySelectorAll('button.bbs_btn.type06')[0],'click');
    setCheckPassword();
    customRegExp = new CutomRegExp();
    customRegExp.passwordCheck(document.getElementById('password_input'),/(?=^[\S]{8,15}$)(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&+=])/);
});
function settingtRegButton(list, reg) {
    document.querySelector(list).addEventListener('click', function (event) {
        customPopup.setOn("계정 중지 확인","계정을 중지 하시겠습니까?",callbackCancelCancel,callbackCancelConfirm);
    });
    document.querySelector(reg).addEventListener('click', function (event) {
        if(document.querySelector(reg).text == '등록'){

            var result = true;
            data = new regPage().make();

            if(data == false){
                inputAlert('비밀번호 확인을 해주세요.', 7);
                return false;
           }

            for(var [key, value] of data){

                if(result == false)
                    break;

                if(value == ''){
                    switch (key){
                        case 'NM':result = inputAlert('성함을 입력해 주세요', 0);break;
                        case 'CLSF':result = inputAlert('직급을 입력해 주세요', 1);break;
                        case 'DEPT':result = inputAlert('부서를 입력해 주세요', 2);break;
                        case 'TELNO':result = inputAlert('연락처를 입력해 주세요', 3);break;
                        default:break;
                    }
                }
            }



            if(result){
                customPopup.setOn("수정 확인","작성된 내용으로 수정하시겠습니까?",callbackConfirmCancel,callbackConfirmConfirm);
            }
        } else {
            document.querySelector(reg).text = '등록';
            document.querySelectorAll('td input').forEach( function (tdi,v){
                if(v != 6 && v != 7 && v != 10 && v != 11){
                    tdi.removeAttribute('disabled');
                    tdi.removeAttribute('readonly');
                }
            });
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
function settingFindSystem(button,event){
    this.function = function (){
        if(document.querySelector('.marker-reg.reg').text =='등록'){
            var path = window.location.pathname;
            path = path.substring(0, path.indexOf(updateEndPoint)) + createEndPoint+ '/findSYS';
            openWin = window.open(path, "findSYS", "status=0,title=0,height=700,width=1200,scrollbars=1");
        }
    }
    button.addEventListener(event,this.function);
}
function setCheckPassword(){

    var green = document.querySelectorAll('td')[6].querySelector('span.bbs_explan.em_green');
    var red = document.querySelectorAll('td')[6].querySelector('span.bbs_explan.em_red');
    var blue = document.querySelectorAll('td')[6].querySelector('span.bbs_explan.em_blue');

    var originPassword=document.querySelectorAll('td input[type="password"]')[1];
    var checkPassword=document.querySelectorAll('td input[type="password"]')[2];
    originPassword.addEventListener('change', function (){

        if(originPassword.value == ''){
            red.classList.contains("off") ? true : red.classList.add('off');
            green.classList.contains("off") ? true : green.classList.add('off');
            blue.classList.contains("off") ? true : blue.classList.add('off');
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

    var path=window.location.pathname+'/pauseID';
    var formData = new FormData();
    formData.enctype ="multipart/form-data";

    var data = {};
    data.MNGR_ID= document.querySelectorAll('td input')[6].value;

    formData.append('request', JSON.stringify(data));
    common.setInfoAsyncAjax("POST",path, formData);
    common.processFileAsyncAjax([callbackSuccessOnLoad], [callbackFailOnLoad]);

    function callbackSuccessOnLoad(res) {
        if (res.indexOf('<!DOCTYPE html>') == -1) {
            if ("SUCCESS" == JSON.parse(res).header.state) {
                alert('정지완료');
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
                alert('저장완료');
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

