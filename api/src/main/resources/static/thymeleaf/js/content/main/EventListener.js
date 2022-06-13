var Account;

window.addEventListener('DOMContentLoaded', function(){
    common = new Common();
    Account = new Header();
    Account.imgClickEvent(common.info.contextRoot + '/main');
    settingAccountSubjectEvent();
    settingAccountMenuEvent();
});

function settingAccountSubjectEvent() {
    Account.SUBJECT.forEach(function (e) {
        e.addEventListener('click',function (event) {
            switch(event.target){
                case Account.SUBJECT[0]:
                    window.location.href = common.info.contextRoot + '/main/account/0/list';
                    break;
                case Account.SUBJECT[1]:
                    window.location.href = common.info.contextRoot + '/main/business/0/list';
                    break;
                case Account.SUBJECT[2]:
                    window.location.href = common.info.contextRoot + '/main/statistics/0/list';
                    break;
            }
        })
    })
}
function settingAccountMenuEvent() {
    Account.MENU.forEach(function (e) {
        e.addEventListener('click', function (event) {
            switch (event.target) {
                case Account.MENU[0]:
                    window.location.href = common.info.contextRoot + '/main/account/0/list';
                    break;
                case Account.MENU[1]:
                    window.location.href = common.info.contextRoot + '/main/business/0/list';
                    break;
                case Account.MENU[2]:
                    window.location.href = common.info.contextRoot + '/main/statistics/0/list';
                    break;
            }
        });
    });
}

function setAccount(url,data,success,fail) {
    Account.URL = url;
    Account.DATA= data;
    Account.FUNC.SUCCESS=success;
    Account.FUNC.FAIL=fail;
}
function returnAccountSuccess(res) {
    console.log(res);
    if("SUCCESS"==JSON.parse(res).header.state){
        window.location.href = JSON.parse(res).body.data.url;
    }else if("ERROR"==JSON.parse(res).header.state){
        var target = document.getElementById('modal-permission-exception');
        common.fade(target);
    } else {
        window.location.reload();
    }
}
function returnAccountFail(res) {
    console.log(res);
}

