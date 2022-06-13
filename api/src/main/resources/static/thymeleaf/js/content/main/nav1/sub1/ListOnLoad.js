var customPopup;
var updatePath = '/updateMapping';
window.onload = function () {
    customPopup = new CustomPopup();
    searchButtonEvent(document.querySelector('button.submit'));
    modifyButtonEvent(document.querySelectorAll('tbody td a.reg'));
};
function searchButtonEvent(searchButton){
    searchButton.addEventListener('click', function(){
        var path = window.location.pathname;
        var param = new Map();
        param.set('param0','');
        param.set('param1','');
        param.set('param2',document.getElementById('bbs_search_text').value);
        var searchParam=makeSearchParam(param);
        window.location.href = path+searchParam;
    });
    function makeSearchParam(param) {
        var searchParams = '';
        param.forEach(function (e,v) {
            if(v==='param0'){
                searchParams += '?'+v+'='+ e;
            } else {
                searchParams += '&'+v+'='+e;
            }
        });
        return searchParams;
    }
}
function modifyButtonEvent(modifyButtons){
    var data = {DEST_PHONE:'',NATION_CODE:''};
    modifyButtons.forEach(function (e,v){
        e.addEventListener('click', function(event){
            if(e.text === '수정') {
                e.text = '등록';
                event.target.parentElement.parentElement.querySelectorAll('td input')[0].removeAttribute('disable');
                event.target.parentElement.parentElement.querySelectorAll('td input')[0].removeAttribute('readonly');
            } else if(e.text === '등록') {
                e.text = '수정';
                data.DEST_PHONE = e.parentElement.parentElement.querySelectorAll('td.subject div span')[0].textContent;
                data.NATION_CODE = e.parentElement.parentElement.querySelectorAll('td input')[0].value;
                event.target.parentElement.parentElement.querySelectorAll('td input')[0].setAttribute('disable', true);
                event.target.parentElement.parentElement.querySelectorAll('td input')[0].setAttribute('readonly', true);
                customPopup.setOn('수정 확인','해당 번호와 국가번호를 매핑하시겠습니까?',callbackCancel,callbackConfirm);
            }
        });
    });

    function callbackCancel() {
        customPopup.off();
    };
    function callbackConfirm() {
        customPopup.off();
        var path = window.location.pathname;
        path = path + updatePath;

        var formData = new FormData();
        formData.enctype ="multipart/form-data";

        formData.append('request', JSON.stringify(data));
        common.setInfoAsyncAjax("POST",path, formData);
        common.processFileAsyncAjax([success], [fail]);
    };
    function success(res) {
        console.log(res);
        if (res.indexOf('<!DOCTYPE html>') == -1) {
            if ("SUCCESS" == JSON.parse(res).header.state) {
                window.location.reload();
            } else {
                var target = document.getElementById('modal-permission-exception');
                common.fade(target);
            }
        } else {
            window.location.reload();
        }
    }
    function fail(res) {
        console.log(res);
    }
}
