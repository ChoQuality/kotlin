function Page(){
    "use strict";

    this.NAV ={DEP1:{}};
    this.PERIOD =document.querySelectorAll('.bbs_btn.round.term');
    this.SUBJECT =document.querySelectorAll('.subject a');
    this.PRINT =document.querySelectorAll('tbody .bbs_btn.type01');
    this.CHECKBOX = document.querySelectorAll('.checkbox.type2');
    this.FUNC = {SUCCESS:{},FAIL:{},COMMON:{}};
    this.DATA = {};
    this.URL = {PATH:{},PARAM:[]};

    setPageNavDep(this.NAV.DEP1);
    setPeriodEvent(this.PERIOD);
    /*setSubjectEvent(this.SUBJECT);*/
    setCheckboxEvent(this.CHECKBOX);

    function setPageNavDep(nav) {
        "use strict";
        var findex = 0;
        document.querySelectorAll('.marker-nav.dep1').forEach(function (e, v) {
            findex = v;
            nav[findex] = e;
            nav[findex].DEP2 = Array.from(nav[findex].getElementsByClassName('dep2'));
            nav[findex].DEP2.forEach(function (e, v) {
                Array.from(nav[findex].DEP2[v].getElementsByClassName('dep3')).forEach(function (e, i) {
                    nav[findex].DEP2[v].DEP3 = Array.from(e.children);
                });
            });
        });
    }
    function setPeriodEvent(period) {
        "use strict";
        period.forEach(function (e) {
            e.addEventListener('click',function(event){
                var date = new Date();
                period.forEach(function (e) {
                    e.classList.remove('on');
                });
                event.target.classList.add('on');
                switch (event.target) {
                    case period[0]:
                        document.getElementById('Report-calendar-input-start').value = date.toISOString().slice(0,10);
                        document.getElementById('Report-calendar-input-end').value = date.toISOString().slice(0,10);
                        break;
                    case period[1]:
                        document.getElementById('Report-calendar-input-end').value = date.toISOString().slice(0,10);
                        date.setMonth(date.getMonth() - 1);
                        document.getElementById('Report-calendar-input-start').value = date.toISOString().slice(0,10);
                        break;
                    case period[2]:
                        document.getElementById('Report-calendar-input-end').value = date.toISOString().slice(0,10);
                        date.setMonth(date.getMonth() - 3);
                        document.getElementById('Report-calendar-input-start').value = date.toISOString().slice(0,10);
                        break;
                    case period[3]:
                        document.getElementById('Report-calendar-input-end').value = date.toISOString().slice(0,10);
                        date.setMonth(date.getMonth() - 6);
                        document.getElementById('Report-calendar-input-start').value = date.toISOString().slice(0,10);
                        break;
                    case period[4]:
                        document.getElementById('Report-calendar-input-end').value = date.toISOString().slice(0,10);
                        date.setMonth(date.getMonth() - 12);
                        document.getElementById('Report-calendar-input-start').value = date.toISOString().slice(0,10);
                        break;
                    case period[5]:
                        document.getElementById('Report-calendar-input-end').value = '';
                        document.getElementById('Report-calendar-input-start').value = '';
                        break;
                }
            })
        })
    }
    this.setSubjectEvent = function (subject) {
        "use strict";
        subject.forEach(function(e){
            e.addEventListener('click', function(event){
                var path=window.location.pathname;
                path = path.substring(0,path.indexOf('/list'));
                var id = event.target.parentElement.getAttribute('id').replace('Report_tr_col2_','');
                window.location.href = path+'/'+id +'/view';
            })
        });
    }

    function setCheckboxEvent(checkbox) {
        "use strict";
        if(checkbox != ''){
            checkbox.forEach(function (e,i) {
                e.addEventListener('click',function (event) {
                    switch(event.target.parentElement){
                        case checkbox[0]:
                            if(checkbox[0].firstElementChild.checked == true){
                                checkbox.forEach(function (e,v) {
                                    checkbox[v].firstElementChild.checked = true;
                                })
                            }else {
                                checkbox.forEach(function (e,v) {
                                    checkbox[v].firstElementChild.checked = false;
                                })
                            }
                            break;
                        default:
                            break;
                    }
                })
            })
        }
    }
    this.setAddSubjectEvent = function(subject){
        "use strict";
        subject.forEach(function(e){
            e.addEventListener('click', function(event){
                var path=window.location.pathname;
                path = path.substring(0,path.indexOf('/list'));
                var id = event.target.parentElement.getAttribute('id').replace('Report_tr_col2_','');
                window.location.href = path+'/'+id +'/view';
            })
        });
    }
    this.setLayerButtonEvent = function(uri,endPoint) {
        "use strict";
        /*var del = document.querySelector('.layer-footer a.delete');*/
        var cancel = document.querySelector('.layer-footer a.cancel');

        var list = document.querySelector('.layer-footer a.list');
        var modify = document.querySelector('.layer-footer a.modify');
        var reg = document.querySelector('.layer-footer a.reg');

        var write = document.querySelector('.layer-footer a.write');

        if(cancel != null){cancel.addEventListener('click', function(){
            var path=window.location.pathname;
            path = path.substring(0,path.indexOf(uri));
            path = path + uri + "/list";
            window.location.href = path;
        });}
        if(list != null){list.addEventListener('click', function(){
            var path=window.location.pathname;
            path = path.substring(0,path.indexOf(uri));
            path = path + uri + endPoint;
            window.location.href = path;
        });}
        if(reg != null){reg.addEventListener('click', function(){
            var path=window.location.pathname;
            path = path.substring(0,path.indexOf(uri));
            path = path + uri + endPoint;
            window.location.href = path;
        });}
        if(modify != null){modify.addEventListener('click', function(){
            var path=window.location.pathname;
            path = path.replace(path.substring(path.lastIndexOf('/')),endPoint);
            window.location.href = path;
        });}
    }
    this.setCalenderEvent =  function (id){
        "use strict";
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
    this.setMenuEvent = function (number) {
        "use strict";
        document.querySelectorAll('.marker-menu li a')[number].classList.add('on');
    }

    this.setAccoutNavEvent = function(uri,nav,navName) {
        "use strict";
        var pathname =window.location.pathname;
        pathname=pathname.substring(pathname.indexOf(navName+'/')).replace(navName+'/','');
        pathname=pathname.substring(0,pathname.indexOf(uri)).split('/');

        this.NAV.DEP1[parseInt(pathname[0])].firstElementChild.firstElementChild.classList.add('on2');
        this.NAV.DEP1[parseInt(pathname[0])].firstElementChild.lastElementChild.classList.remove('nav-hidden');
        if(pathname[1] == null || pathname[0] == '0' || pathname[0] == '4'|| pathname[0] == '5'){
            this.NAV.DEP1[parseInt(pathname[0])].DEP2[0].firstElementChild.firstElementChild.classList.add('on2');
        } else {
            this.NAV.DEP1[parseInt(pathname[0])].DEP2[0].DEP3[parseInt(pathname[1])].firstElementChild.classList.add('on2');
        }
        var path=window.location.pathname;
        path = path.substring(0,path.indexOf('/'+navName)) + '/'+navName;
        this.NAV.DEP1[0].addEventListener('click',function (event) {
            if(event.target == nav.DEP1[0].firstElementChild.firstElementChild ){
                addOnHidden(event);
            }else if(event.target == nav.DEP1[0].DEP2[0].firstElementChild.firstElementChild ){
                window.location.href = path + '/0'+'/list';
            }
        });
        /*this.NAV.DEP1[1].addEventListener('click',function (event) {
            if(event.target == nav.DEP1[1].firstElementChild.firstElementChild ){
                addOnHidden(event);
            } else if(event.target == nav.DEP1[1].DEP2[0].firstElementChild.firstElementChild ){
                addOnHidden(event);
            }
            else {
                nav.DEP1[1].DEP2[0].DEP3.forEach(function(e,v){
                    if(event.target == e.firstElementChild){
                        window.location.href = path + '/1/'+ v +'/list';
                    }
                })
            }
        });
        this.NAV.DEP1[2].addEventListener('click',function (event) {
            if(event.target == nav.DEP1[2].firstElementChild.firstElementChild ){
                addOnHidden(event);
            } else if(event.target == nav.DEP1[2].DEP2[0].firstElementChild.firstElementChild ){
                addOnHidden(event);
            }
            else {
                nav.DEP1[2].DEP2[0].DEP3.forEach(function(e,v){
                    if(event.target == e.firstElementChild){
                        window.location.href = path + '/2/'+ v +'/list';
                    }
                })
            }
        });*/
    }
    this.setBusinessNavEvent = function(uri,nav,navName) {
        "use strict";
        var pathname =window.location.pathname;
        pathname=pathname.substring(pathname.indexOf(navName+'/')).replace(navName+'/','');
        pathname=pathname.substring(0,pathname.indexOf(uri)).split('/');

        /*this.NAV.DEP1[0].firstElementChild.firstElementChild.classList.add('on2');
        this.NAV.DEP1[0].firstElementChild.lastElementChild.classList.remove('nav-hidden');
        this.NAV.DEP1[0].DEP2[0].DEP3[parseInt(pathname[0])].firstElementChild.classList.add('on2');*/

        this.NAV.DEP1[0].firstElementChild.firstElementChild.classList.add('on2');
        this.NAV.DEP1[0].firstElementChild.lastElementChild.classList.remove('nav-hidden');
        if(pathname[1] == null || pathname[0] == '0'){
            this.NAV.DEP1[parseInt(pathname[0])].DEP2[0].firstElementChild.firstElementChild.classList.add('on2');
        } else {
            this.NAV.DEP1[parseInt(pathname[0])].DEP2[0].DEP3[parseInt(pathname[1])].firstElementChild.classList.add('on2');
        }

        var path=window.location.pathname;
        path = path.substring(0,path.indexOf('/'+navName)) + '/'+navName;
        this.NAV.DEP1[0].addEventListener('click',function (event) {

            if(event.target == nav.DEP1[0].firstElementChild.firstElementChild ){
                addOnHidden(event);
            }else if(event.target == nav.DEP1[0].DEP2[0].firstElementChild.firstElementChild ){
                window.location.href = path + '/0'+'/list';
            }

            /*if(event.target == nav.DEP1[0].firstElementChild.firstElementChild ){
                addOnHidden(event);
            } else if(event.target == nav.DEP1[0].DEP2[0].firstElementChild.firstElementChild ){
                addOnHidden(event);
            }
            else {
                nav.DEP1[0].DEP2[0].DEP3.forEach(function(e,v){
                    if(event.target == e.firstElementChild){
                        window.location.href = path + '/'+ v +'/list';
                    }
                })
            }*/
        });
    }


    this.setStatisticNavEvent = function(uri,nav,navName) {
        "use strict";
        var pathname =window.location.pathname;
        pathname=pathname.substring(pathname.indexOf(navName+'/')).replace(navName+'/','');
        pathname=pathname.substring(0,pathname.indexOf(uri)).split('/');

        this.NAV.DEP1[0].firstElementChild.firstElementChild.classList.add('on2');
        this.NAV.DEP1[0].firstElementChild.lastElementChild.classList.remove('nav-hidden');
        if(pathname[1] == null || pathname[0] == '0'){
            this.NAV.DEP1[parseInt(pathname[0])].DEP2[0].firstElementChild.firstElementChild.classList.add('on2');
        } else {
            this.NAV.DEP1[parseInt(pathname[0])].DEP2[0].DEP3[parseInt(pathname[1])].firstElementChild.classList.add('on2');
        }

        var path=window.location.pathname;
        path = path.substring(0,path.indexOf('/'+navName)) + '/'+navName;
        this.NAV.DEP1[0].addEventListener('click',function (event) {
            if(event.target == nav.DEP1[0].firstElementChild.firstElementChild ){
                addOnHidden(event);
            }else if(event.target == nav.DEP1[0].DEP2[0].firstElementChild.firstElementChild ){
                window.location.href = path + '/0'+'/list';
            }
        });

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

    this.setPrintEvent =function () {}
    this.setAdditionalEvent = function () {
        var searchParams = window.location.search;
        var pageValue = getParamValue(searchParams,'page=');
        if(document.getElementById('Report-calendar-input-start') != undefined){
            document.getElementById('Report-calendar-input-start').value = decodeURI(getParamValue(searchParams,'param0='));
            document.getElementById('Report-calendar-input-end').value = decodeURI(getParamValue(searchParams,'param1='));
            if( document.getElementById('bbs_search_text') != null){
                document.getElementById('bbs_search_text').value = decodeURI(getParamValue(searchParams,'param2='));
            }
            if(document.getElementById('bbs_search_select02') != null){
                if(getParamValue(searchParams,'param3=') != ''){
                    document.getElementById('bbs_search_select02').value= getParamValue(searchParams,'param3=');
                }
            }
        }

        if(pageValue != ''){
            pageValue = 'seq'+pageValue;
            document.getElementById(pageValue).parentElement.classList.add('on');
        } else {
            pageValue = 'seq1';
            document.getElementById(pageValue).parentElement.classList.add('on');
        }
    }
    function getParamValue(searchParams,param) {
        if(searchParams.indexOf(param) != -1){
            var startParamOffset = searchParams.indexOf(param);
            var lastParamOffset = searchParams.indexOf('&',startParamOffset);
            lastParamOffset = lastParamOffset > startParamOffset ? lastParamOffset : searchParams.length ;
            return searchParams.substring(startParamOffset,lastParamOffset).replace(param,'');
        } else {
            return '';
        }
    }

}
function AddTrafficStatus(id) {
    this.instance = document.querySelector(id);
    var count = 0;

    this.setOnAdd = function (id) {
        this.instance.addEventListener('click', function () {
            document.querySelector(id).append(reportNav0TrafficCondition(count));
            var calendarId = '#bbs_search_day_s' + count;
            page.setCalenderEvent(calendarId);
            count++;
            setOnDel('.marker-traffic-button.delete');
            setOnSave('.marker-traffic-button.write');
        });
    }

    function setOnDel(delId) {
        document.querySelectorAll(delId).forEach(function (e) {
            e.removeEventListener('click', delTrafficStatusEventListener);
            e.addEventListener('click', delTrafficStatusEventListener);
        });
        function delTrafficStatusEventListener(event) {
            event.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
        }
    }

    function setOnSave(saveId) {
        var saves = document.querySelectorAll(saveId);
        saves.forEach(function (e) {
            if(!e.onclick){
                e.onclick = changeState;
            };
        });
        function changeState(event) {
            if (event.target.textContent.indexOf('저장') == -1) {
                var p = event.target.parentElement.parentElement.parentElement;
                var table = p.firstElementChild.lastElementChild;
                p.classList.remove('marker-func-modify');
                p.classList.add('marker-func-save');
                table.children[0].lastElementChild.firstElementChild.firstElementChild.disabled = false;
                table.children[0].lastElementChild.firstElementChild.lastElementChild.disabled = false;
                table.children[0].lastElementChild.lastElementChild.removeAttribute('onfocus');
                table.children[0].lastElementChild.lastElementChild.removeAttribute('onchange');
                table.children[1].lastElementChild.firstElementChild.removeAttribute('onfocus');
                table.children[1].lastElementChild.firstElementChild.removeAttribute('onchange');
                table.children[2].lastElementChild.firstElementChild.removeAttribute('readonly');
                table.children[3].lastElementChild.firstElementChild.removeAttribute('readonly');
                table.children[4].lastElementChild.firstElementChild.removeAttribute('readonly');
                table.children[5].lastElementChild.firstElementChild.removeAttribute('readonly');
                table.children[6].lastElementChild.firstElementChild.removeAttribute('readonly');
                event.target.textContent = '저장';
            } else if (event.target.textContent.indexOf('저장') >= 0) {
                var p = event.target.parentElement.parentElement.parentElement;
                var table = p.firstElementChild.lastElementChild;
                p.classList.remove('marker-func-save');
                p.classList.add('marker-func-modify');
                table.children[0].lastElementChild.firstElementChild.firstElementChild.disabled = true;
                table.children[0].lastElementChild.firstElementChild.lastElementChild.disabled = true;
                table.children[0].lastElementChild.lastElementChild.setAttribute('onfocus', 'this.initialSelect = this.selectedIndex');
                table.children[0].lastElementChild.lastElementChild.setAttribute('onchange', 'this.selectedIndex = this.initialSelect');
                table.children[1].lastElementChild.firstElementChild.setAttribute('onfocus', 'this.initialSelect = this.selectedIndex');
                table.children[1].lastElementChild.firstElementChild.setAttribute('onchange', 'this.selectedIndex = this.initialSelect');
                table.children[2].lastElementChild.firstElementChild.setAttribute('readonly', 'readonly');
                table.children[3].lastElementChild.firstElementChild.setAttribute('readonly', 'readonly');
                table.children[4].lastElementChild.firstElementChild.setAttribute('readonly', 'readonly');
                table.children[5].lastElementChild.firstElementChild.setAttribute('readonly', 'readonly');
                table.children[6].lastElementChild.firstElementChild.setAttribute('readonly', 'readonly');
                event.target.textContent = '수정';
            }
        }
    }
}
function cmsReportReg() {
    document.querySelectorAll('input.marker-statistic-change').forEach(function (e) {
        e.addEventListener('change', function (event) {
            var sum = 0;
            document.querySelectorAll('.marker-statistic-change.' + event.target.classList[1]).forEach(function (e) {
                sum = isNaN(e.value) ? 0 : (e.value - 0) + (sum - 0);
            });
            document.querySelector('.marker-statistic-sum.' + event.target.classList[1]).value = sum;
        });
    });
    this.page = {
        info: {}
        , weather: {}
        , traffic: {}
        , statistics: {}
        , status: {}
        , broad: {}
        , unique: {}
    }
    this.make = function () {
        cmsReportRegInfofunc(this.page.info);
        cmsReportRegWeatherfunc(this.page.weather);
        cmsReportRegTrafficfunc(this.page.traffic);
        cmsReportRegStatisticsfunc(this.page.statistics);
        cmsReportRegStatusfunc(this.page.status);
        cmsReportRegBroadfunc(this.page.broad);
        cmsReportRegUniquefunc(this.page.unique);
    }
    function cmsReportRegInfofunc(info) {
        var date = new Date().toISOString().slice(0,10);
        var WORK_BEGIN_DT = document.getElementById('day_s01').value == '' ? date : document.getElementById('day_s01').value;
        var WORK_END_DT = document.getElementById('day_e01').value == '' ? date : document.getElementById('day_e01').value;
        info.WORK_BEGIN_DT = WORK_BEGIN_DT + ' ' + document.getElementById('time01_01').value.replace('시', ':00');
        info.WORK_END_DT = WORK_END_DT + ' ' + document.getElementById('time01_02').value.replace('시', ':00');
        info.DEPT_NM = document.getElementById('view-report-depart').firstElementChild.textContent;
        info.OPRTR_NM = document.getElementById('view-report-depart').lastElementChild.textContent;
        info.REPORT_SJ = document.getElementById('title01').value == '' ? '제목이 지정되지 않았습니다.': document.getElementById('title01').value;
    }
    function cmsReportRegWeatherfunc(weather) {
        weather.WETHER_SITTN_STDR_CN = document.getElementById('view-report-weather').value;
        weather.WETHER_SITTN_CN = reportWeatherEditor.instance.getById["editor-bind-textarea-weather"].getContents();
    }
    function cmsReportRegTrafficfunc(traffic) {
        traffic.list = [];
        traffic.CNTRMSR_STTUS_STDR_CN = document.getElementById('view-report-traffic').value;
        document.querySelectorAll('.marker-traffic-status .box_wrap .box tbody').forEach(function (e) {
            if(e.parentElement.parentElement.classList.contains('marker-func-modify')){
                var subTraffic = new subTrafficPage();
                var date = new Date().toISOString().slice(0,10);
                var CNTRMSR_STTUS_DT = e.children[0].lastElementChild.firstElementChild.firstElementChild.value == '' ? date : e.children[0].lastElementChild.firstElementChild.firstElementChild.value;
                subTraffic.CNTRMSR_STTUS_DT = CNTRMSR_STTUS_DT +' '+ e.children[0].lastElementChild.lastElementChild.value.replace('시', ':00');
                var select = e.children[1].lastElementChild.firstElementChild;
                subTraffic.MANAGE_INSTT_NM = select.options[select.selectedIndex].text;
                subTraffic.ROAD_INSTT_CODE = select.options[select.selectedIndex].value;
                subTraffic.LC_INFO = e.children[2].lastElementChild.firstElementChild.value;
                subTraffic.ACDNT_CN = e.children[3].lastElementChild.firstElementChild.value;
                subTraffic.ACDNT_CNTRMSR_CN = e.children[4].lastElementChild.firstElementChild.value;
                subTraffic.HNL_DMGE_CN = e.children[5].lastElementChild.firstElementChild.value;
                subTraffic.FCLTS_DMGE_CN = e.children[6].lastElementChild.firstElementChild.value;
                traffic.list.push(subTraffic);
            }
        });
    }
    function cmsReportRegStatisticsfunc(statistics) {
        statistics.STATS_STDR_CN=document.getElementById('view-report-statistic').value;
        statistics.pre = {};
        statistics.total = {};
        statistics.pre.accident = new subStatisticPage('.marker-statistic-sum.a', '.marker-statistic-change.a');
        statistics.pre.dead = new subStatisticPage('.marker-statistic-sum.b', '.marker-statistic-change.b');
        statistics.pre.injury = new subStatisticPage('.marker-statistic-sum.c', '.marker-statistic-change.c');
        statistics.total.accident = new subStatisticPage('.marker-statistic-sum.d', '.marker-statistic-change.d');
        statistics.total.dead = new subStatisticPage('.marker-statistic-sum.e', '.marker-statistic-change.e');
        statistics.total.injury = new subStatisticPage('.marker-statistic-sum.f', '.marker-statistic-change.f');
    }
    function cmsReportRegStatusfunc(status) {
        status.MSFRTN_CRISIS_CNTRMSR_CN =
            reportStatusEditor.instance.getById["editor-bind-textarea-status"].getContents();
    }
    function cmsReportRegBroadfunc(broad) {
        broad.MSCMNC_MONTR_CN =
            reportBroadEditor.instance.getById["editor-bind-textarea-broad"].getContents();
    }
    function cmsReportRegUniquefunc(unique) {
        unique.PARTCLR_CN =
            reportUniqueEditor.instance.getById["editor-bind-textarea-unique"].getContents();
    }

    function subTrafficPage() {

    }
    function subStatisticPage(sumQuery, eachQuery) {
        this.sum = document.querySelector(sumQuery).value;
        this.highway = document.querySelectorAll(eachQuery)[0].value;
        this.nationalway = document.querySelectorAll(eachQuery)[1].value;
        this.accidentA = document.querySelectorAll(eachQuery)[2].value;
        this.accidentB1 = document.querySelectorAll(eachQuery)[3].value;
        this.accidentB2 = document.querySelectorAll(eachQuery)[4].value;
    }
}
function cmsReportView() {
    document.querySelectorAll('input.marker-statistic-change').forEach(function (e) {
        e.addEventListener('change', function (event) {
            var sum = 0;
            document.querySelectorAll('.marker-statistic-change.' + event.target.classList[1]).forEach(function (e) {
                sum = isNaN(e.value) ? 0 : (e.value - 0) + (sum - 0);
            });
            document.querySelector('.marker-statistic-sum.' + event.target.classList[1]).value = sum;
        });
    });
    this.page = {
        info: {}
        , weather: {}
        , traffic: {}
        , statistics: {}
        , status: {}
        , broad: {}
        , unique: {}
    }
    this.make = function () {
        cmsReportViewInfofunc(this.page.info);
        cmsReportViewWeatherfunc(this.page.weather);
        cmsReportViewTrafficfunc(this.page.traffic);
        cmsReportViewStatisticsfunc(this.page.statistics);
        cmsReportViewStatusfunc(this.page.status);
        cmsReportViewBroadfunc(this.page.broad);
        cmsReportViewUniquefunc(this.page.unique);
    }
    function cmsReportViewInfofunc(info) {
        var date = new Date().toISOString().slice(0,10);
        var WORK_BEGIN_DT = document.getElementById('day_s01').value == '' ? date : document.getElementById('day_s01').value;
        var WORK_END_DT = document.getElementById('day_e01').value == '' ? date : document.getElementById('day_e01').value;
        info.WORK_BEGIN_DT = WORK_BEGIN_DT + ' ' + document.getElementById('time01_01').value.replace('시', ':00');
        info.WORK_END_DT = WORK_END_DT + ' ' + document.getElementById('time01_02').value.replace('시', ':00');
        info.DEPT_NM = document.getElementById('view-report-depart').firstElementChild.textContent;
        info.OPRTR_NM = document.getElementById('view-report-depart').lastElementChild.textContent;
        info.REPORT_SJ = document.getElementById('title01').value == '' ? '제목이 지정되지 않았습니다.': document.getElementById('title01').value;
    }
    function cmsReportViewWeatherfunc(weather) {
        weather.WETHER_SITTN_STDR_CN = document.getElementById('view-report-weather').value;
        weather.WETHER_SITTN_CN = reportWeatherEditor.instance.getById["editor-bind-textarea-weather"].getContents();
    }
    function cmsReportViewTrafficfunc(traffic) {
        traffic.list = [];
        traffic.CNTRMSR_STTUS_STDR_CN = document.getElementById('view-report-traffic').value;
        document.querySelectorAll('.marker-traffic-status .box_wrap .box tbody').forEach(function (e) {
            if(e.parentElement.parentElement.classList.contains('marker-func-modify')){
                var subTraffic = new subTrafficPage();
                var date = new Date().toISOString().slice(0,10);
                var CNTRMSR_STTUS_DT = e.children[0].lastElementChild.firstElementChild.firstElementChild.value == '' ? date : e.children[0].lastElementChild.firstElementChild.firstElementChild.value;
                subTraffic.CNTRMSR_STTUS_DT = CNTRMSR_STTUS_DT +' '+ e.children[0].lastElementChild.lastElementChild.value.replace('시', ':00');
                var select = e.children[1].lastElementChild.firstElementChild;
                subTraffic.MANAGE_INSTT_NM = select.options[select.selectedIndex].text;
                subTraffic.ROAD_INSTT_CODE = select.options[select.selectedIndex].value;
                subTraffic.LC_INFO = e.children[2].lastElementChild.firstElementChild.value;
                subTraffic.ACDNT_CN = e.children[3].lastElementChild.firstElementChild.value;
                subTraffic.ACDNT_CNTRMSR_CN = e.children[4].lastElementChild.firstElementChild.value;
                subTraffic.HNL_DMGE_CN = e.children[5].lastElementChild.firstElementChild.value;
                subTraffic.FCLTS_DMGE_CN = e.children[6].lastElementChild.firstElementChild.value;
                traffic.list.push(subTraffic);
            }
        });
    }
    function cmsReportViewStatisticsfunc(statistics) {
        statistics.STATS_STDR_CN=document.getElementById('view-report-statistic').value;
        statistics.pre = {};
        statistics.total = {};
        statistics.pre.accident = new subStatisticPage('.marker-statistic-sum.a', '.marker-statistic-change.a');
        statistics.pre.dead = new subStatisticPage('.marker-statistic-sum.b', '.marker-statistic-change.b');
        statistics.pre.injury = new subStatisticPage('.marker-statistic-sum.c', '.marker-statistic-change.c');
        statistics.total.accident = new subStatisticPage('.marker-statistic-sum.d', '.marker-statistic-change.d');
        statistics.total.dead = new subStatisticPage('.marker-statistic-sum.e', '.marker-statistic-change.e');
        statistics.total.injury = new subStatisticPage('.marker-statistic-sum.f', '.marker-statistic-change.f');
    }
    function cmsReportViewStatusfunc(status) {
        status.MSFRTN_CRISIS_CNTRMSR_CN =
            reportStatusEditor.instance.getById["editor-bind-textarea-status"].getContents();
    }
    function cmsReportViewBroadfunc(broad) {
        broad.MSCMNC_MONTR_CN =
            reportBroadEditor.instance.getById["editor-bind-textarea-broad"].getContents();
    }
    function cmsReportViewUniquefunc(unique) {
        unique.PARTCLR_CN =
            reportUniqueEditor.instance.getById["editor-bind-textarea-unique"].getContents();
    }

    function subTrafficPage() {

    }
    function subStatisticPage(sumQuery, eachQuery) {
        this.sum = document.querySelector(sumQuery).value;
        this.highway = document.querySelectorAll(eachQuery)[0].value;
        this.nationalway = document.querySelectorAll(eachQuery)[1].value;
        this.accidentA = document.querySelectorAll(eachQuery)[2].value;
        this.accidentB1 = document.querySelectorAll(eachQuery)[3].value;
        this.accidentB2 = document.querySelectorAll(eachQuery)[4].value;
    }
}
function CustomPopup() {
    this.popup= document.querySelector('.custom-popup-section');
    this.title=document.querySelector('.custom-popup-section .title');
    this.content=document.querySelector('.custom-popup-section .content');
    this.cancel=document.querySelector('.custom-popup-section .cancel');
    this.confirm=document.querySelector('.custom-popup-section .confirm');

    this.setOn = function (title,content,cancelFunc,confirmFunc) {
        this.title.textContent = title;
        this.content.textContent =content;
        this.cancel.onclick = cancelFunc;
        this.confirm.onclick = confirmFunc;
        this.on();
    }
    this.on = function () {
        this.popup.classList.add('on');
    };
    this.off = function () {
        this.popup.classList.add('off');
        this.popup.classList.remove('on');
    };
}
function waitPopup() {
    const wait = document.querySelector('.custom-popup-wait.off');
    this.on = function () {
        wait.classList.add('on');
    }
    this.off = function () {
        wait.classList.remove('on');
    }
    this.set = function (title,content) {
        document.querySelector('.custom-popup-wait.off')
            .querySelector('.layer .title').textContent=title;
        document.querySelector('.custom-popup-wait.off')
            .querySelector('.layer .body .content').textContent=content;
    }
}
function CutomRegExp(){
    this.emailCheck = function(emailInput,reg){
        /*var emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+[.]+[a-zA-Z]{2,3}$/i;*/

        emailInput.addEventListener('change', function(){
            if(reg.test(emailInput.value.trim()) ==  false){
                emailInput.value ='';
                alert('올바르지 않은 메일 형식입니다.');
            }
        })
    }
    this.idCheck = function(idInput,reg){
        /*var passwordReg = /(?=^[\S]{8,15}$)(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&+=])/;*/
        idInput.addEventListener('change', function(){

            if(idInput.value.trim().length < 5){
                idInput.value ='';
                alert('5자리 이상 입력해 주세요.');
            } else {
                if(reg.test(idInput.value.trim()) ==  false){
                    idInput.value ='';
                    alert('올바르지 않은 ID 형식입니다.');
                }
            }
        })
    }
    this.passwordCheck = function(passwordInput,reg){
        /*var passwordReg = /(?=^[\S]{8,15}$)(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&+=])/;*/
        passwordInput.addEventListener('change', function(){
            if(reg.test(passwordInput.value.trim()) ==  false){
                passwordInput.value ='';
                alert('올바르지 않은 비밀번호 형식입니다.');
            }
        })
    }
    this.ipv4Check = function(ipv4,reg){
        /*var ipv4Reg = /^[0-9]{1,3}[.]+[0-9]{1,3}[.]+[0-9]{1,3}[.]+[0-9]{1,3}$/i;*/
        ipv4.addEventListener('change', function(){
            if(reg.test(ipv4.value.trim()) ==  false){
                ipv4.value ='';
                alert('올바르지 않은 ip 형식입니다.');
            }
        })
    }
}
