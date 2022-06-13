var page;
window.addEventListener('DOMContentLoaded', function(){
    page = new Page();
    page.setMenuEvent(2);
    page.setStatisticNavEvent('/list',page.NAV,'statistics');
});







