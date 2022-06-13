var customPopup;
var endPoint = '/excelDown'
window.onload = function () {
    customPopup = new CustomPopup();
    searchButtonEvent(document.querySelector('button.submit'));
    excelDownButtonEvent(document.querySelector('td button'));
    setDetailInfo();
};
function searchButtonEvent(searchButton){
    searchButton.addEventListener('click', function(){
        var path = window.location.pathname;
        var param = new Map();
        if(checkInfo(param)){
            var searchParam=makeSearchParam(param);
            window.location.href = path+searchParam;
        }

    });
    function makeSearchParam(param) {
        var searchParams = '';
        param.forEach(function (e,v) {
            if(v==='param0'){
                searchParams += '?'+v+'='+ e;
            } else {
                searchParams += '&'+v+'='+e;
            }
        });
        return searchParams;
    }
}
function excelDownButtonEvent(excelButton){

    excelButton.addEventListener('click', function (){
        var param = new Map();
        if(checkInfo(param)){
            var path=window.location.pathname + endPoint;
            var data = { sys: '', year:'', month:''};
            param.forEach(function(value, key, map){
                switch(key){
                    case 'param0':
                        data.sys = value;
                        break;
                    case 'param1':
                        data.year = value;
                        break;
                    case 'param2':
                        data.month = value;
                        break;
                }
            });

            var formData = new FormData();
            formData.enctype ="multipart/form-data";
            formData.append('request', JSON.stringify(data));
            common.setInfoAsyncAjax("POST",path, formData);
            common.processFileAsyncAjax([callbackSuccess], [callbackFail]);
        }
    })
    function callbackSuccess(res){
        if (res.indexOf('<!DOCTYPE html>') == -1) {
            if ("SUCCESS" == JSON.parse(res).header.state) {
                var fileconent = JSON.parse(res).body.data.ExcelContent;

                var byteCharacters = atob(fileconent);
                var byteNumbers = new Array(byteCharacters.length);
                for (var i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);

                var filetype = JSON.parse(res).body.data.ExcelType;
                var filename = JSON.parse(res).body.data.ExcelName + '.xlsx';
                var file = new Blob([byteArray], { type: 'application/vnd.ms-excel' });

                var link=document.createElement('a');
                link.href=window.URL.createObjectURL(file);
                link.download=filename;
                link.click();

            } else {
                console.log(res);
            }
        } else {
            window.location.reload();
        }
    }
    function callbackFail(res){
        console.log(res);
    }
}
function checkInfo(param){
    param.set('param0',document.querySelectorAll('select')[0].selectedOptions[0].dataset.seq);
    param.set('param1',document.querySelectorAll('select')[1].selectedOptions[0].value.replace('연도', '').replace('년', ''));
    param.set('param2',document.querySelectorAll('select')[2].selectedOptions[0].value.replace('월',''));

    for(var [key, value] of param){
        if(value == null || value == ''){
            if(key == 'param0'){
                alert('업무시스템을 선택해 주세요');
                return false;
            }else if(key == 'param1'){
                alert('연도를 선택해 주세요');
                return false;
            }else if(key == 'param2'){
                alert('해당월을 선택해 주세요');
                return false;
            }
        }
    }
    return true;
}

function setDetailInfo(){

    var param = new Map();
    param.set('param0',document.querySelectorAll('select')[0].selectedOptions[0].dataset.seq);
    param.set('param1',document.querySelectorAll('select')[1].selectedOptions[0].value.replace('연도', '').replace('년', ''));
    param.set('param2',document.querySelectorAll('select')[2].selectedOptions[0].value.replace('월',''));
    var path=window.location.pathname;
    var data = { sys: '', year:'', month:''};
    param.forEach(function(value, key, map){
        switch(key){
            case 'param0':
                data.sys = value;
                break;
            case 'param1':
                data.year = value;
                break;
            case 'param2':
                data.month = value;
                break;
        }
    });

    for(var [key, value] of param){
        if(value == null || value == ''){
            var date = new Date();
            document.querySelectorAll('select')[2].options[ date.getMonth()+1].selected = true;
            var yearOpt=Array.from(document.querySelectorAll('select')[1].options);
            yearOpt.forEach(function (el,v){
                var currentYear = date.getFullYear() + '년';
                if(el.innerText == currentYear){
                    yearOpt[v].selected = true;
                }
            });
            if(yearOpt[document.querySelectorAll('select')[1].selectedIndex].innerText == '연도'){
                yearOpt[document.querySelectorAll('select')[1].selectedIndex].innerText = date.getFullYear() + '년';
            }
            return false;
        }
    }

    var formData = new FormData();
    formData.enctype ="multipart/form-data";
    formData.append('request', JSON.stringify(data));
    common.setInfoAsyncAjax("POST",path, formData);
    common.processFileAsyncAjax([callbackSuccess], [callbackFail]);

    function callbackSuccess(res){

        if (res.indexOf('<!DOCTYPE html>') == -1) {
            if ("SUCCESS" == JSON.parse(res).header.state) {

                var dataTr = document.querySelectorAll(".box tbody[data-tr]");
                var sumAll = document.querySelectorAll('tfoot td input');

                switch(JSON.parse(res).body.data.dataType){
                    case 'all':
                        dataTr.forEach(function(e,v){
                            e.querySelectorAll('tr td input').forEach(function(el){
                                el.value = 0;
                            });
                        });
                        sumAll.forEach(function(sum,v){
                            sum.value =0;
                        })

                        var dataStats = JSON.parse(res).body.data.stats;
                        dataStats.forEach(function (stat){

                            var sumTrInput = dataTr[parseInt(stat.statsDe.substring(6,8) -1)].querySelector('tr[data-sum]').querySelectorAll('td input');

                            dataTr[parseInt(stat.statsDe.substring(6,8) -1)]
                                .querySelectorAll('tr').forEach(function(el){

                                if(el.dataset.code == stat.sysCode){
                                    el.querySelectorAll('td input')[0].value =  stat.smsSuccesCnt;
                                    sumTrInput[0].value =  parseInt(sumTrInput[0].value)+ parseInt(el.querySelectorAll('td input')[0].value);
                                    el.querySelectorAll('td input')[1].value =  stat.smsFailrCnt;
                                    sumTrInput[1].value =  parseInt(sumTrInput[1].value)+ parseInt(el.querySelectorAll('td input')[1].value);
                                    el.querySelectorAll('td input')[2].value =  stat.lmsSuccesCnt;
                                    sumTrInput[2].value =  parseInt(sumTrInput[2].value)+ parseInt(el.querySelectorAll('td input')[2].value);
                                    el.querySelectorAll('td input')[3].value =  stat.lmsFailrCnt;
                                    sumTrInput[3].value =  parseInt(sumTrInput[3].value)+ parseInt(el.querySelectorAll('td input')[3].value);
                                    el.querySelectorAll('td input')[4].value =  stat.mmsSuccesCnt;
                                    sumTrInput[4].value =  parseInt(sumTrInput[4].value)+ parseInt(el.querySelectorAll('td input')[4].value);
                                    el.querySelectorAll('td input')[5].value =  stat.mmsFailrCnt;
                                    sumTrInput[5].value =  parseInt(sumTrInput[5].value)+ parseInt(el.querySelectorAll('td input')[5].value);
                                    el.querySelectorAll('td input')[6].value =  stat.talkSuccesCnt;
                                    sumTrInput[6].value =  parseInt(sumTrInput[6].value)+ parseInt(el.querySelectorAll('td input')[6].value);
                                    el.querySelectorAll('td input')[7].value =  stat.talkFailrCnt;
                                    sumTrInput[7].value =  parseInt(sumTrInput[7].value)+ parseInt(el.querySelectorAll('td input')[7].value);
                                    el.querySelectorAll('td input')[8].value =
                                        parseInt(el.querySelectorAll('td input')[0].value)
                                        + parseInt(el.querySelectorAll('td input')[2].value)
                                        + parseInt(el.querySelectorAll('td input')[4].value)
                                        + parseInt(el.querySelectorAll('td input')[6].value);
                                    sumTrInput[8].value =  parseInt(sumTrInput[8].value)+ parseInt(el.querySelectorAll('td input')[8].value);
                                    el.querySelectorAll('td input')[9].value =
                                        parseInt(el.querySelectorAll('td input')[1].value)
                                        + parseInt(el.querySelectorAll('td input')[3].value)
                                        + parseInt(el.querySelectorAll('td input')[5].value)
                                        + parseInt(el.querySelectorAll('td input')[7].value);
                                    sumTrInput[9].value =  parseInt(sumTrInput[9].value)+ parseInt(el.querySelectorAll('td input')[9].value);
                                }
                            })
                        });


                        document.querySelectorAll('tbody tr[data-sum]').forEach(function(sumList){
                            sumList.querySelectorAll('td input').forEach(function(sum,v){
                                sumAll[v].value = parseInt(sumAll[v].value) + parseInt(sum.value);
                            });
                        });

                        break;
                    case 'each':
                        dataTr.forEach(function(e,v){
                            e.querySelectorAll('td').forEach(function(ee,v){
                                if(v > 1){
                                    ee.querySelector('input').value = 0;
                                }
                            });
                        });
                        sumAll.forEach(function(sum,v){
                            sum.value =0;
                        })

                        var dataStats = JSON.parse(res).body.data.stats;
                        dataStats.forEach(function(stat){
                            var dataTdInput = dataTr[parseInt(stat.statsDe.substring(6,8) -1)].querySelectorAll('td input');
                            dataTdInput[0].value =  stat.smsSuccesCnt;
                            sumAll[0].value = parseInt(sumAll[0].value) + parseInt(dataTdInput[0].value);
                            dataTdInput[1].value =  stat.smsFailrCnt;
                            sumAll[1].value = parseInt(sumAll[1].value) + parseInt(dataTdInput[1].value);
                            dataTdInput[2].value =  stat.lmsSuccesCnt;
                            sumAll[2].value = parseInt(sumAll[2].value) + parseInt(dataTdInput[2].value);
                            dataTdInput[3].value =  stat.lmsFailrCnt;
                            sumAll[3].value = parseInt(sumAll[3].value) + parseInt(dataTdInput[3].value);
                            dataTdInput[4].value =  stat.mmsSuccesCnt;
                            sumAll[4].value = parseInt(sumAll[4].value) + parseInt(dataTdInput[4].value);
                            dataTdInput[5].value =  stat.mmsFailrCnt;
                            sumAll[5].value = parseInt(sumAll[5].value) + parseInt(dataTdInput[5].value);
                            dataTdInput[6].value =  stat.talkSuccesCnt;
                            sumAll[6].value = parseInt(sumAll[6].value) + parseInt(dataTdInput[6].value);
                            dataTdInput[7].value =  stat.talkFailrCnt;
                            sumAll[7].value = parseInt(sumAll[7].value) + parseInt(dataTdInput[7].value);
                            dataTdInput[8].value = parseInt(dataTdInput[0].value) + parseInt(dataTdInput[2].value) + parseInt(dataTdInput[4].value)+ parseInt(dataTdInput[6].value);
                            sumAll[8].value = parseInt(sumAll[8].value) + parseInt(dataTdInput[8].value);
                            dataTdInput[9].value = parseInt(dataTdInput[1].value) + parseInt(dataTdInput[3].value) + parseInt(dataTdInput[5].value)+ parseInt(dataTdInput[7].value);
                            sumAll[9].value = parseInt(sumAll[9].value) + parseInt(dataTdInput[9].value);
                        });



                        break;
                    default:
                        break;
                }




            } else {
                console.log(res);
            }
        } else {
            window.location.reload();
        }
    }
    function callbackFail(res){
        console.log(res);
    }
}