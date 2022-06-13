var page,reg;
window.addEventListener('DOMContentLoaded', function(){
    page = new Page();
    page.setMenuEvent(0);
    page.setAccoutNavEvent('/update',page.NAV,'account');
    reg = new regPage();
});

function regPage() {
    this.make = function () {

        var originPassword=document.querySelectorAll('td input[type="password"]')[1].value;
        var checkPassword=document.querySelectorAll('td input[type="password"]')[2].value;

        var data = new Map();
        var N=document.getElementById('expressP0').checked;
        var S=document.getElementById('expressP1').checked;

        var author=document.querySelector('input[checked]').getAttribute('id').replace('expressP','');
        data.set("NM",document.querySelectorAll('td input')[0].value);
        if(N == true){
            data.set("AUTHOR",'N');
        } else {
            data.set("AUTHOR",'S');
        }
        data.set("CLSF",document.querySelectorAll('td input')[3].value);
        data.set("DEPT",document.querySelectorAll('td input')[4].value);
        data.set("TELNO",document.querySelectorAll('td input')[5].value);
        /*data.set("EMAIL",document.querySelectorAll('td input')[6].value);*/
        data.set("MNGR_ID",document.querySelectorAll('td input')[6].value);
        if(document.getElementById('parent_SYS_code').dataset.code == null){
            data.set("SYS_CODE_ORI",document.querySelectorAll('td input')[11].value);
        } else {
            data.set("SYS_CODE_ORI",document.getElementById('parent_SYS_code').dataset.code);
        }

        if(originPassword !== ''){
            if(originPassword !== checkPassword){
                return false;
            }
            data.set("PASSWORD",document.querySelectorAll('td input')[8].value);
        }
        data.set("SYS_NM",document.querySelectorAll('td input')[10].value);
        data.set("SYS_CODE",document.querySelectorAll('td input')[11].value);
        data.set("MEMO",document.querySelectorAll('td input')[12].value);

        /*return Object.fromEntries(data);*/
        return data;
    }
}


