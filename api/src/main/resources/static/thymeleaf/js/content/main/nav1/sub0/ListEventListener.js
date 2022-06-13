var page;
window.addEventListener('DOMContentLoaded', function(){
    page = new Page();
    page.setMenuEvent(1);
    page.setBusinessNavEvent('/list',page.NAV,'business');
    /*page.setCalenderEvent('#Report-calendar-input-start,#Report-calendar-input-end');*/
    page.setLayerButtonEvent('/0','/reg');
    page.setAdditionalEvent();
});







