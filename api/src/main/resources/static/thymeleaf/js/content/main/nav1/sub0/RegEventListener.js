var page,reg;
window.addEventListener('DOMContentLoaded', function(){
    page = new Page();
    page.setMenuEvent(1);
    page.setBusinessNavEvent('/reg',page.NAV,'business');
    reg = new regPage();
});

function regPage() {

    this.tempEvent = function (tempQuery, index, event, tempFunction){
        var button = document.querySelectorAll(tempQuery)[index];
        button.addEventListener(event,tempFunction);
    }

    this.make = function () {
        var data = new Map();
        var author=document.querySelector('input[checked]').getAttribute('id').replace('expressP','');
        data.set("NM",document.querySelectorAll('td input')[0].value);
        data.set("AUTHOR",author =='0'?'N':'S');
        data.set("CLSF",document.querySelectorAll('td input')[3].value);
        data.set("DEPT",document.querySelectorAll('td input')[4].value);
        data.set("TELNO",document.querySelectorAll('td input')[5].value);
        data.set("EMAIL",document.querySelectorAll('td input')[6].value);
        data.set("MNGR_ID",document.querySelectorAll('td input')[7].value);
        data.set("PASSWORD",document.querySelectorAll('td input')[8].value);
        data.set("SYS_NM",document.querySelectorAll('td input')[9].value);
        data.set("SYS_CODE",document.querySelectorAll('td input')[10].value);
        data.set("MEMO",document.querySelectorAll('td input')[11].value);

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


