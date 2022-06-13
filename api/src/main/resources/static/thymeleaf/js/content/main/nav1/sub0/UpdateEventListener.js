var page,reg;
window.addEventListener('DOMContentLoaded', function(){
    page = new Page();
    page.setMenuEvent(1);
    page.setBusinessNavEvent('/update',page.NAV,'business');
});
