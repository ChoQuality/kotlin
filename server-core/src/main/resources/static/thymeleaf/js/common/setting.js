function fade(element) {
    element.style.display = 'inline';
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}
function popup(element) {
    element.style.display = 'inline';
}
/*

function Header(subject,menu,func,data,url) {
    this.SUBJECT = subject;
    this.MENU = menu;
    this.FUNC = func;
    this.DATA = data;
    this.URL = url;
}
function HeaderSubject() {
    return document.querySelectorAll('.marker-subject .contents_box button');
}
function HeaderMenu() {
    return document.querySelectorAll('.marker-menu li a');
}
function Page(nav,period,subject,print,checkbox,func,data,url) {
    this.NAV = nav;
    this.PERIOD = period;
    this.SUBJECT = subject;
    this.PRINT = print;
    this.CHECKBOX = checkbox;
    this.FUNC = func;
    this.DATA = data;
    this.URL = url;
    this.setOn = {};
}

function PageNav() {
    return {DEP1:{}};
}
function PagePeriod() {
    return document.querySelectorAll('.bbs_btn.round.term');
}
function PageSubject() {
    return document.querySelectorAll('.subject a');
}
function PagePrint() {
    return document.querySelectorAll('tbody .bbs_btn.type01');
}
function PageCheckBox() {
    return document.querySelectorAll('.checkbox.type2');
}
function Data() {
    return {};
}
function Func() {
    return {SUCCESS:{},FAIL:{},COMMON:{}};
}
function Url() {
    return {PATH:{},PARAM:[]};
}
function addOnHidden(event){
    if(event.target.classList.contains('on2')){
        event.target.classList.remove('on2');
        event.target.parentElement.children[1].classList.add('nav-hidden');
    } else {
        event.target.classList.add('on2')
        event.target.parentElement.children[1].classList.remove('nav-hidden');
    }
}

function settingButtonEvent(uri) {
    var del = document.querySelector('.layer-footer a.delete');
    var cancel = document.querySelector('.layer-footer a.cancel');

    var list = document.querySelector('.layer-footer a.list');
    var modify = document.querySelector('.layer-footer a.modify');
    var reg = document.querySelector('.layer-footer a.reg');

    var write = document.querySelector('.layer-footer a.write');
    /!*var update = document.querySelector('.layer-footer a.update');*!/

    if(del != null) del.addEventListener('click', function(){
        alert('삭제 미구현');
    });
    /!*if(update != null){update.addEventListener('click', function(){
        alert('수정 미구현');
    });}*!/
    if(write != null){write.addEventListener('click', function(){
        alert('등록 미구현');
    });}

    if(cancel != null){cancel.addEventListener('click', function(){
        var path=window.location.pathname;
        path = path.substring(0,path.indexOf(uri));
        path = path + uri + "/list";
        window.location.href = path;
    });}
    if(list != null){list.addEventListener('click', function(){
        var path=window.location.pathname;
        path = path.substring(0,path.indexOf(uri));
        path = path + uri + "/list";
        window.location.href = path;
    });}
    if(reg != null){reg.addEventListener('click', function(){
        var path=window.location.pathname;
        path = path.substring(0,path.indexOf(uri));
        path = path + uri + "/reg";
        window.location.href = path;
    });}
    if(modify != null){modify.addEventListener('click', function(){
        var path=window.location.pathname;
        path = path.replace(path.substring(path.lastIndexOf('/')),'/modify');
        window.location.href = path;
    });}
}
function setCalenderEvent(id){
    $(id).datepicker({
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        showOtherMonths: true,
        showOn:'both',
        dateFormat: 'yy-mm-dd',
        prevText: '이전 달',

        nextText: '다음 달',
        monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
        monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
        dayNames: ['일','월','화','수','목','금','토'],
        dayNamesShort: ['일','월','화','수','목','금','토'],

        autoSize: true,
        dayNamesMin: ['일','월','화','수','목','금','토'],
        showMonthAfterYear: true,
        yearSuffix: '년'
    });

    $.datepicker._gotoToday = function(id) {
        $(id).datepicker('setDate', new Date()).datepicker('hide').blur();
    };
}


function setOnMenuEvent(number) {
    document.querySelectorAll('.marker-menu li a')[number].classList.add('on');
}


function setCISHomepageNavEvent(uri,HOMEPAGE) {
    var pathname =window.location.pathname;
    pathname=pathname.substring(pathname.indexOf('homepage/')).replace('homepage/','');
    pathname=pathname.substring(0,pathname.indexOf(uri)).split('/');

    HOMEPAGE.NAV.DEP1[parseInt(pathname[0])].firstElementChild.firstElementChild.classList.add('on2');
    HOMEPAGE.NAV.DEP1[parseInt(pathname[0])].firstElementChild.lastElementChild.classList.remove('nav-hidden');
    if(pathname[1] == null || pathname[0] == '0' || pathname[0] == '4'|| pathname[0] == '5'){
        HOMEPAGE.NAV.DEP1[parseInt(pathname[0])].DEP2[0].firstElementChild.firstElementChild.classList.add('on2');
    } else {
        HOMEPAGE.NAV.DEP1[parseInt(pathname[0])].DEP2[0].DEP3[parseInt(pathname[1])].firstElementChild.classList.add('on2');
    }
    var path=window.location.pathname;
    path = path.substring(0,path.indexOf('/homepage')) + '/homepage';
    HOMEPAGE.NAV.DEP1[0].addEventListener('click',function (event) {
        if(event.target == HOMEPAGE.NAV.DEP1[0].firstElementChild.firstElementChild ){
            addOnHidden(event);
        }else if(event.target == HOMEPAGE.NAV.DEP1[0].DEP2[0].firstElementChild.firstElementChild ){
            window.location.href = path + '/0'+'/list';
        }
    });
    HOMEPAGE.NAV.DEP1[1].addEventListener('click',function (event) {
        if(event.target == HOMEPAGE.NAV.DEP1[1].firstElementChild.firstElementChild ){
            addOnHidden(event);
        } else if(event.target == HOMEPAGE.NAV.DEP1[1].DEP2[0].firstElementChild.firstElementChild ){
            addOnHidden(event);
        }
        else {
            HOMEPAGE.NAV.DEP1[1].DEP2[0].DEP3.forEach(function(e,v){
                if(event.target == e.firstElementChild){
                    window.location.href = path + '/1/'+ v +'/list';
                }
            })
        }
    });
    HOMEPAGE.NAV.DEP1[2].addEventListener('click',function (event) {
        if(event.target == HOMEPAGE.NAV.DEP1[2].firstElementChild.firstElementChild ){
            addOnHidden(event);
        } else if(event.target == HOMEPAGE.NAV.DEP1[2].DEP2[0].firstElementChild.firstElementChild ){
            addOnHidden(event);
        }
        else {
            HOMEPAGE.NAV.DEP1[2].DEP2[0].DEP3.forEach(function(e,v){
                if(event.target == e.firstElementChild){
                    window.location.href = path + '/2/'+ v +'/list';
                }
            })
        }
    });
    HOMEPAGE.NAV.DEP1[3].addEventListener('click',function (event) {
        if(event.target == HOMEPAGE.NAV.DEP1[3].firstElementChild.firstElementChild ){
            addOnHidden(event);
        } else if(event.target == HOMEPAGE.NAV.DEP1[3].DEP2[0].firstElementChild.firstElementChild ){
            addOnHidden(event);
        }
        else {
            HOMEPAGE.NAV.DEP1[3].DEP2[0].DEP3.forEach(function(e,v){
                if(event.target == e.firstElementChild){
                    window.location.href = path + '/3/'+ v +'/list';
                }
            })
        }
    });
    HOMEPAGE.NAV.DEP1[4].addEventListener('click',function (event) {
        if(event.target == HOMEPAGE.NAV.DEP1[4].firstElementChild.firstElementChild ){
            addOnHidden(event);
        }else if(event.target == HOMEPAGE.NAV.DEP1[4].DEP2[0].firstElementChild.firstElementChild ){
            window.location.href = path + '/4'+'/list';
        }
    });
    HOMEPAGE.NAV.DEP1[5].addEventListener('click',function (event) {
        if(event.target == HOMEPAGE.NAV.DEP1[5].firstElementChild.firstElementChild ){
            addOnHidden(event);
        }else if(event.target == HOMEPAGE.NAV.DEP1[5].DEP2[0].firstElementChild.firstElementChild ){
            window.location.href = path + '/5'+'/list';
        }
    });
}

function setCMSMonitoringNavEvent(uri,MONITORING) {
    var pathname =window.location.pathname;
    pathname=pathname.substring(pathname.indexOf('monitoring/')).replace('monitoring/','');
    pathname=pathname.substring(0,pathname.indexOf(uri)).split('/');

    MONITORING.NAV.DEP1[parseInt(pathname[0])].firstElementChild.firstElementChild.classList.add('on2');
    MONITORING.NAV.DEP1[parseInt(pathname[0])].firstElementChild.lastElementChild.classList.remove('nav-hidden');
    if(pathname[1] == null || pathname[0] == '0'){
        MONITORING.NAV.DEP1[parseInt(pathname[0])].DEP2[0].firstElementChild.firstElementChild.classList.add('on2');
    } else {
        MONITORING.NAV.DEP1[parseInt(pathname[0])].DEP2[0].DEP3[parseInt(pathname[1])].firstElementChild.classList.add('on2');
    }
    var path=window.location.pathname;
    path = path.substring(0,path.indexOf('/monitoring')) + '/monitoring';
    MONITORING.NAV.DEP1[0].addEventListener('click',function (event) {
        if(event.target == MONITORING.NAV.DEP1[0].firstElementChild.firstElementChild ){
            addOnHidden(event);
        }else if(event.target == MONITORING.NAV.DEP1[0].DEP2[0].firstElementChild.firstElementChild ){
            window.location.href = path + '/0'+'/summary';
        }
    });
}

function setCMSReportNavEvent(uri,REPORT) {
    var pathname =window.location.pathname;
    pathname=pathname.substring(pathname.indexOf('report/')).replace('report/','');
    pathname=pathname.substring(0,pathname.indexOf(uri)).split('/');

    REPORT.NAV.DEP1[parseInt(pathname[0])].firstElementChild.firstElementChild.classList.add('on2');
    REPORT.NAV.DEP1[parseInt(pathname[0])].firstElementChild.lastElementChild.classList.remove('nav-hidden');
    if(pathname[1] == null || pathname[0] == '0' || pathname[0] == '1'){
        REPORT.NAV.DEP1[parseInt(pathname[0])].DEP2[0].firstElementChild.firstElementChild.classList.add('on2');
    } else {
        REPORT.NAV.DEP1[parseInt(pathname[0])].DEP2[0].DEP3[parseInt(pathname[1])].firstElementChild.classList.add('on2');
    }
    var path=window.location.pathname;
    path = path.substring(0,path.indexOf('/report')) + '/report';
    REPORT.NAV.DEP1[0].addEventListener('click',function (event) {
        if(event.target == REPORT.NAV.DEP1[0].firstElementChild.firstElementChild ){
            addOnHidden(event);
        }else if(event.target == REPORT.NAV.DEP1[0].DEP2[0].firstElementChild.firstElementChild ){
            window.location.href = path + '/0'+'/list';
        }
    });
    REPORT.NAV.DEP1[1].addEventListener('click',function (event) {
        if(event.target == REPORT.NAV.DEP1[1].firstElementChild.firstElementChild ){
            addOnHidden(event);
        }else if(event.target == REPORT.NAV.DEP1[1].DEP2[0].firstElementChild.firstElementChild ){
            window.location.href = path + '/1'+'/list';
        }
    });
}
function setCMSManagementNavEvent(uri,MANAGEMENT) {
    var pathname =window.location.pathname;
    pathname=pathname.substring(pathname.indexOf('management/')).replace('management/','');
    pathname=pathname.substring(0,pathname.indexOf(uri)).split('/');

    MANAGEMENT.NAV.DEP1[parseInt(pathname[0])].firstElementChild.firstElementChild.classList.add('on2');
    MANAGEMENT.NAV.DEP1[parseInt(pathname[0])].firstElementChild.lastElementChild.classList.remove('nav-hidden');
    if(pathname[1] == null || pathname[0] == '0' || pathname[0] == '1'){
        MANAGEMENT.NAV.DEP1[parseInt(pathname[0])].DEP2[0].firstElementChild.firstElementChild.classList.add('on2');
    } else {
        MANAGEMENT.NAV.DEP1[parseInt(pathname[0])].DEP2[0].DEP3[parseInt(pathname[1])].firstElementChild.classList.add('on2');
    }
    var path=window.location.pathname;
    path = path.substring(0,path.indexOf('/management')) + '/management';
    MANAGEMENT.NAV.DEP1[0].addEventListener('click',function (event) {
        if(event.target == MANAGEMENT.NAV.DEP1[0].firstElementChild.firstElementChild ){
            addOnHidden(event);
        }else if(event.target == MANAGEMENT.NAV.DEP1[0].DEP2[0].firstElementChild.firstElementChild ){
            window.location.href = path + '/0'+'/list';
        }
    });
    MANAGEMENT.NAV.DEP1[1].addEventListener('click',function (event) {
        if(event.target == MANAGEMENT.NAV.DEP1[1].firstElementChild.firstElementChild ){
            addOnHidden(event);
        }else if(event.target == MANAGEMENT.NAV.DEP1[1].DEP2[0].firstElementChild.firstElementChild ){
            window.location.href = path + '/1'+'/list';
        }
    });
}
function fileDown(filecontent) {
    var fileconent = filecontent;

    var byteCharacters = atob(fileconent);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);

    var filetype = response.body.data.filetype;
    var filename = response.body.data.filename;
    var file = new Blob([byteArray], { type: filetype });

    var link=document.createElement('a');
    link.href=window.URL.createObjectURL(file);
    link.download=filename;
    link.click()
}
function viewImage(content,type){
    var target = $('.reg-setting-image');
    target.fadeIn();

    $(document.getElementById('Reg-pop-image')).children().remove();

    var filebyte = content;

    var byteCharacters = atob(filebyte);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);

    var file = new Blob([byteArray], { type: type });

    var image = new Image();
    image.src = window.URL.createObjectURL(file);
    image.height = 350;
    image.width = 350;
    image.style.margin = 0;
    document.getElementById('Reg-pop-image').appendChild(image);
};

function excelDown(jObj){
    console.log(jObj);
    var fileconent = jObj.responseJSON.body.data.ExcelContent;

    var byteCharacters = atob(fileconent);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);

    var filetype = jObj.responseJSON.body.data.ExcelType;
    var filename = jObj.responseJSON.body.data.ExcelName + '.xlsx';
    var file = new Blob([byteArray], { type: filetype });

    var link=document.createElement('a');
    link.href=window.URL.createObjectURL(file);
    link.download=filename;
    link.click();
};

function upload(upload){
    return {
        upload: upload
    }
}


function fileDownloadEvent(downButtons,callbackSuccess,callbackFail){
    var path=window.location.pathname;
    downButtons.forEach(function (e,v) {
        e.addEventListener('click', function (event) {
            if(path.indexOf('list') !== -1){
                path = path.replaceAll('list','down');
            } else if(path.indexOf('view') !== -1){
                path = path.replaceAll('view','down');
            } else if(path.indexOf('modify') !== -1){
                path = path.replaceAll('modify','down');
            } else if(path.indexOf('reg') !== -1){
                path = path.replaceAll('reg','down');
            }
            var index = event.target.parentElement.getAttribute('id').replace('Monitoring_ul_','')

            setInfoAsyncAjax("POST",path, {downloadIndex: index},callbackSuccess,callbackFail);
            processAsyncAjax('application/json');
        })
    })
}
function fileUploadEvent(updateButton,fileList,editor,editorId,callbackSuccess,callbackFail){
    var path=window.location.pathname;
    updateButton.addEventListener('click', function () {
        if(path.indexOf('list') !== -1){
            path = path.replaceAll('list','update');
        } else if(path.indexOf('view') !== -1){
            path = path.replaceAll('view','update');
        } else if(path.indexOf('modify') !== -1){
            path = path.replaceAll('modify','update');
        } else if(path.indexOf('reg') !== -1){
            path = path.replaceAll('reg','update');
        }
        var formData = new FormData();
        formData.enctype ="multipart/form-data";
        for (const [key, value]  of fileList.entries())
        {
            formData.append('files',value);
        }
        formData.append('title', document.querySelector('.subject').firstElementChild.value);
        formData.append('content', editor.getById[editorId].getContents());

        setInfoAsyncAjax("POST",path, formData,callbackSuccess,callbackFail);
        processFileAsyncAjax();
    });
}

function FormDataToJSON(formData){


    for (const [key, value]  of formData.entries())
    {
        var fileReader = new FileReader( );
        fileReader.onload = function ( evt ) { success( evt.target.result ) };
        fileReader.readAsText( file );
        ConvertedJSON[key] = value;
    }
    var success = function ( content ) {
        console.log( JSON.stringify( content ) ); }





    return JSON.stringify(ConvertedJSON);
}
function makeFile(file, type, name) {
    var fileconent = file;

    /!*var byteCharacters = atob(fileconent);*!/
    var byteCharacters = file;
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);

    var filetype = type;
    var filename = name;
    var file = new Blob([byteArray], { type: filetype });
    return file;
}
*/

