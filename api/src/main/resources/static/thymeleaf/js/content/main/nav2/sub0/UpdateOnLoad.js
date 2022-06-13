var subUri = '/0'
var readEndPoint ='/list'
var createEndPoint ='/reg'
var updateEndPoint ='/update'
var customPopup, openWin,customRegExp;
window.addEventListener('DOMContentLoaded', function(){
    customPopup = new CustomPopup();
    settingtRegButton('.marker-reg.list', '.marker-reg.reg');
    settingViewSystem(document.querySelectorAll('button.bbs_btn.type06')[0],'click');
    customRegExp = new CutomRegExp();
    customRegExp.ipv4Check(document.getElementById('ipv4_input'),/^[0-9]{1,3}[.]+[0-9]{1,3}[.]+[0-9]{1,3}[.]+[0-9]{1,3}$/i);
});
function settingtRegButton(list, reg) {
    document.querySelector(list).addEventListener('click', function (event) {
        customPopup.setOn("수정 취소 확인","목록으로 가시겠습니까?",callbackCancelCancel,callbackCancelConfirm);
    });
    document.querySelector(reg).addEventListener('click', function (event) {
        if(document.querySelector(reg).text == '등록'){
            customPopup.setOn("수정 확인","작성된 내용으로 수정하시겠습니까?",callbackConfirmCancel,callbackConfirmConfirm);
        } else {
            document.querySelector(reg).text = '등록';
            document.querySelectorAll('td input').forEach( function (tdi,v){
                if(v != 1){
                    tdi.removeAttribute('disabled');
                    tdi.removeAttribute('readonly');
                }
            });
        }
    });
};
function settingViewSystem(button,event){
    this.function = function (){
        if(document.querySelector('.marker-reg.reg').text =='등록'){
            var path = window.location.pathname;
            path = path.substring(0, path.indexOf(updateEndPoint)) + createEndPoint+ '/viewSYS';
            openWin = window.open(path, "viewSYS", "status=0,title=0,height=700,width=1200,scrollbars=1");
        }
    }
    button.addEventListener(event,this.function);
}
function setCheckPassword(){
    var originPassword=document.querySelectorAll('td input[type="password"]')[1];
    var checkPassword=document.querySelectorAll('td input[type="password"]')[2];
    originPassword.addEventListener('change', function (){
        if(originPassword.value == ''){
            alert("비밀번호를 입력해 주세요.");
            return false;
        }
        if(originPassword.value != checkPassword.value){
            alert("비밀번호를 다시 확인해 주세요.");
            checkPassword.value ='';
        }
    })
    checkPassword.addEventListener('change', function (){
        if(checkPassword.value == ''){
            alert("비밀번호를 입력해 주세요.");
            return false;
        }
        if(originPassword.value != checkPassword.value){
            alert("비밀번호를 다시 확인해 주세요.");
            checkPassword.value ='';
        } else{
            alert("비밀번호 확인이 완료되었습니다.");
        }
    })
}

function callbackCancelCancel() {
    customPopup.off();
};
function callbackCancelConfirm() {
    customPopup.off();
    var path=window.location.pathname;
    path = path.substring(0,path.indexOf(updateEndPoint))+readEndPoint;
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
    var data = make();
    if(data !== false){
        formData.append('request', JSON.stringify(data));
        common.setInfoAsyncAjax("POST",path, formData);
        common.processFileAsyncAjax([callbackSuccessOnLoad], [callbackFailOnLoad]);
    }
    function callbackSuccessOnLoad(res) {
        if (res.indexOf('<!DOCTYPE html>') == -1) {
            if ("SUCCESS" == JSON.parse(res).header.state) {
                alert('등록 완료');
                var path = window.location.pathname;
                path = path.substring(0,path.indexOf(updateEndPoint))+readEndPoint;
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

    function make() {
        this.data = {
            SYS_NM:document.querySelectorAll('td input')[0].value,
            SYS_CODE:document.querySelectorAll('td input')[1].value,
            SYS_IP:document.querySelectorAll('td input')[2].value
        }
        if(this.data.SYS_NM == '' || this.data.SYS_CODE == ''|| this.data.SYS_IP == ''){
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

