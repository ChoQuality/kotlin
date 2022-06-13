var page,reg;
window.addEventListener('DOMContentLoaded', function(){
    page = new Page();
    page.setMenuEvent(1);
    page.setBusinessNavEvent('/update',page.NAV,'business');
    reg = new regPage();
});

function regPage() {
    this.make = function () {

        var originPassword=document.querySelectorAll('td input[type="password"]')[1].value;
        var checkPassword=document.querySelectorAll('td input[type="password"]')[2].value;

        var data = new Map();
        var author=document.querySelector('input[checked]').getAttribute('id').replace('expressP','');
        data.set("NM",document.querySelectorAll('td input')[0].value);
        data.set("AUTHOR",author =='0'?'N':'S');
        data.set("CLSF",document.querySelectorAll('td input')[3].value);
        data.set("DEPT",document.querySelectorAll('td input')[4].value);
        data.set("TELNO",document.querySelectorAll('td input')[5].value);
        data.set("EMAIL",document.querySelectorAll('td input')[6].value);
        data.set("MNGR_ID",document.querySelectorAll('td input')[7].value);
        if(document.getElementById('parent_SYS_code').dataset.code == null){
            return false;
        }
        data.set("SYS_CODE_ORI",document.getElementById('parent_SYS_code').dataset.code);

        if(originPassword !== ''){
            if(originPassword !== checkPassword){
                return false;
            }
            data.set("PASSWORD",document.querySelectorAll('td input')[9].value);
        }
        data.set("SYS_NM",document.querySelectorAll('td input')[11].value);
        data.set("SYS_CODE",document.querySelectorAll('td input')[12].value);
        data.set("MEMO",document.querySelectorAll('td input')[13].value);

        for(var [key, value] of data){
            if(value == ''){
                if(key != 'MEMO'){
                    alert('빈값이 존재 합니다.');
                    return false;
                }
            }
        }
        return Object.fromEntries(data);
    }
}


