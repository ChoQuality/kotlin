var page;
window.addEventListener('DOMContentLoaded', function(){
    page = new Page();
    page.setMenuEvent(0);
    page.setAccoutNavEvent('/list',page.NAV,'account');
    page.setCalenderEvent('#Report-calendar-input-start,#Report-calendar-input-end');
    page.setLayerButtonEvent('/0','/reg');
    page.setAdditionalEvent();
});







