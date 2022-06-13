var customPopup;
window.onload = function () {
    customPopup = new CustomPopup();
    searchButtonEvent(document.querySelector('button.submit'));
    setSubjectEvent(document.querySelectorAll('td a'),'/list','/update');
    delButtonEvent(document.querySelector('.layer-button.delete'));
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
function setSubjectEvent(subject,uri,endpoint) {
    "use strict";
    subject.forEach(function(e){
        e.addEventListener('click', function(event){
            var path=window.location.pathname;
            path = path.substring(0,path.indexOf(uri))+endpoint;
            var id = event.target.parentElement.getAttribute('id').replace('Report_tr_col2_','');
            var code = event.target.parentElement.getAttribute('id').replace('Report_tr_col2_','');
            window.location.href = path + '?' +'param0='+id;
        })
    });
}
function delButtonEvent(delButton){
    var delSeq =[];
    delButton.addEventListener('click', function(){
        delSeq = [];
        page.CHECKBOX.forEach(function(e,v){
            if(v != 0){
                if(page.CHECKBOX[v].firstElementChild.checked){
                    delSeq.push(page.CHECKBOX[v].firstElementChild.getAttribute('id').replace('Report_tr_col5_',''));
                }
            }
        });
        if(delSeq.length == 0){
            alert('삭제가 필요한 시스템을 선택하세요');
        } else if(delSeq.length == 1){
            customPopup.setOn('삭제 체크 확인','선택한 시스템을 삭제하시겠습니까?',callbackCancel,callbackConfirm);
        } else if(delSeq.length > 1){
            customPopup.setOn('삭제 체크 확인','선택한 시스템들을 모두 삭제하시겠습니까?',callbackCancel,callbackConfirm);
        }
    });

    function callbackCancel() {
        customPopup.off();
    };
    function callbackConfirm() {
        customPopup.off();
        var path = window.location.pathname;
        path = path + '/delSYS';

        var formData = new FormData();
        formData.enctype ="multipart/form-data";
        var data = {delSeq:delSeq};
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
