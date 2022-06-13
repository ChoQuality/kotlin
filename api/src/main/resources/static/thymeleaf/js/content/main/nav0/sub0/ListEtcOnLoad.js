var customPopup;

window.onload = function () {
    customPopup = new CustomPopup();
    searchButtonEvent(document.querySelector('button.submit'));
    regButtonEvent(document.querySelector('.layer-button.reg'),'findSYS','regSYS');
    setSubjectEvent(document.querySelectorAll('tr'));
    setSelectEvent( document.querySelector('.layer-button.list'),'click' );

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
function regButtonEvent(regButton, uri, endPoint){
    this.function = function (){
        var path=window.location.pathname;
        path = path.substring(0,path.indexOf(uri));
        path = path + endPoint;
        window.location.href = path
    }
    regButton.addEventListener('click', this.function);
}
function setSubjectEvent(subject) {
    "use strict";
    var tr = subject;
    subject.forEach( function(e, v){
        if(v >=2 ){
            e.addEventListener('click', function (event){
                tr.forEach(function(et,v){
                    et.removeAttribute('style');
                });
                if(event.target instanceof HTMLTableRowElement){
                    if(event.target.getAttribute('id')!=null){
                        event.target.style.backgroundColor='rgb(238, 238, 238)';
                    }
                } else {
                    event.target.parentElement.click();
                }
            });
        }
    })
}
function setSelectEvent(selectButton,event){
    selectButton.addEventListener(event, function (){
        if(document.querySelector('tr[style="background-color: rgb(238, 238, 238);"]') == null){
            alert('등록하실 시스템을 선택하세요.');
            return false;
        }
        if(opener != null){
            var td = document.querySelector('tr[style="background-color: rgb(238, 238, 238);"]').querySelectorAll('td');
            opener.receiveSystemData(td[1].innerText,td[2].innerText);
            window.close();
        }
    });
}


