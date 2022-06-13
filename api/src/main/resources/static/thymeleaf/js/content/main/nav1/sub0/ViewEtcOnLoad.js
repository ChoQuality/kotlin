var customPopup;
window.onload = function () {
    customPopup = new CustomPopup();
    searchButtonEvent(document.querySelector('button.submit'));
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
