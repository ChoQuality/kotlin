var customPopup;
window.onload = function () {
    customPopup = new CustomPopup();
    searchButtonEvent(document.querySelector('button.submit'));
    setSubjectEvent(document.querySelectorAll('td a'),'/list','/update')
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
