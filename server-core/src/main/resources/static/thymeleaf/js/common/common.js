function Common() {
    "use strict";

    this.info = commonInfo();
    this.instance = commonInstance();
    this.req = new Request();

    function Request() {
        reqData();
        /*this.header = reqHeader();
        this.body = reqBody();*/
        function reqData() {
            return {};
        }

        function reqHeader() {
            return {result: 0, state: ''};
        }

        function reqBody() {
            return {data: {}};
        }
    }

    function commonInfo() {
        return {
            /*contextRoot: document.querySelector('meta[name=ctx]').attributes.content.value == '/' ? '' : document.querySelector('meta[name=ctx]').attributes.content.value
            ,*/
            /*csrfToken: document.querySelector('meta[name=_csrf]').attributes.content == null ? '' :document.querySelector('meta[name=_csrf]').attributes.content.value
            , csrfHeader: document.querySelector('meta[name=_csrf_header]').attributes.content == null ? '' : document.querySelector('meta[name=_csrf_header]').attributes.content.value
            ,*/
            method: {}
            , url: {}
            , func: {success: {}, fail: {}}
            , data: {}
        };
    }

    function commonInstance() {
        return new XMLHttpRequest();
    }

    this.setInfoAsyncAjax = function (method, url, data) {
        this.info.method = method;
        this.info.url = url;
        this.req = data;
    }

    this.processAsyncAjax = function (type, success, fail) {
        this.callbackS = success;
        this.callbackF = fail;

        this.instance.open(this.info.method, this.info.url, true);
        /*this.instance.setRequestHeader(this.info.csrfHeader, this.info.csrfToken);*/
        this.instance.setRequestHeader('Content-Type', type);
        this.instance.send(JSON.stringify(this.req));
        this.instance.onload = function (event) {
            checkServerStatus(event, success, fail);
        }
    }
    this.processFileAsyncAjax = function (success, fail) {
        this.callbackS = success;
        this.callbackF = fail;
        this.instance.open(this.info.method, this.info.url, true);
        /*this.instance.setRequestHeader(this.info.csrfHeader, this.info.csrfToken);*/
        this.instance.send(this.req.body.data);
        this.instance.onload =  function(event){
            checkServerStatus(event,success,fail);
        }
    }

    function checkServerStatus(event, success, fail) {
        const UNSENT = 0, OPENED = 1, HEADERS_RECEIVED = 2, LOADING = 3, DONE = 4;
        switch (event.target.readyState) {
            case DONE:
                switch (event.target.status) {
                    case 200:
                        checkServerStatusCallbackSuccess(event, success);
                        break;
                    case 400:
                    case 500:
                        checkServerStatusCallbackFail(event, fail);
                        break;
                }
                break;
            case LOADING:
            case HEADERS_RECEIVED:
            case OPENED:
                break;
            case UNSENT:
                break;
        }

    }

    function checkServerStatusCallbackSuccess(event, success) {
        for (var i = 0; i < success.length; i++) {
            success[i](event.target.response);
        }
        ;
    }

    function checkServerStatusCallbackFail(event, fail) {
        for (var i = 0; i < fail.length; i++) {
            fail[i](event.target.response);
        }
        ;
    }

    this.fileDownloadEvent = function (instance, downButtons, callbackSuccess, callbackFail) {
        var path = window.location.pathname;
        downButtons.forEach(function (e, v) {
            e.addEventListener('click', function (event) {
                if (path.indexOf('list') !== -1) {
                    path = path.replaceAll('list', 'down');
                } else if (path.indexOf('view') !== -1) {
                    path = path.replaceAll('view', 'down');
                } else if (path.indexOf('modify') !== -1) {
                    path = path.replaceAll('modify', 'down');
                } else if (path.indexOf('reg') !== -1) {
                    path = path.replaceAll('reg', 'down');
                }
                var index = event.target.parentElement.getAttribute('id').replace('Monitoring_ul_', '')

                instance.setInfoAsyncAjax("POST", path, {downloadIndex: index});
                instance.processAsyncAjax('application/json', callbackSuccess, callbackFail);
            })
        })
    }

    this.fileList = new Map();
    this.setSelectFileEvent = function (id, fileList) {
        var fileId = document.getElementById(id);
        fileId.addEventListener('click',function (e) {
            e.target.value ='';
        });
        fileId.addEventListener('change', function (e) {

            if (document.querySelector('.marker-file-attach').textContent.indexOf('첨부된 파일이 없습니다.') != -1) {
                document.querySelector('.marker-file-attach').textContent = '';
            }
            if(fileList.get(e.currentTarget.files.item(0).name) != null){
                alert('이미 첨부된 파일입니다.');
            } else {
                /*fileList.set(fileId.files[0].name, fileId.files[0]);*/
                fileList.set(e.currentTarget.files.item(0).name, e.currentTarget.files.item(0));
                document.querySelector('.marker-file-attach').append(fileAttachAppendData());
                var input = document.querySelectorAll('.marker-file-attach input');
                input[(input.length - 1)].value = fileId.files[0].name;
            }
            document.querySelectorAll('.marker-file-attach button').forEach(function (e, v) {
                e.addEventListener('click', function (el) {
                    fileList['delete'](el.target.parentNode.firstElementChild.value);
                    el.target.parentElement.parentElement.remove();
                    if (document.querySelector('.marker-file-attach').childElementCount == 0) {
                        document.querySelector('.marker-file-attach').textContent = '첨부된 파일이 없습니다.';
                    }
                });
            });

        });
        return fileId;
    }
    this.setSelectOneFileEvent = function (id, fileList) {
        var fileId = document.getElementById(id);
        fileId.addEventListener('click',function (e) {
            e.target.value ='';
        });
        fileId.addEventListener('change', function (e) {
            if(fileList.size == 1){
                alert('이미 첨부된 파일이 있습니다');
            } else {
                if (document.querySelector('.marker-file-attach').textContent.indexOf('첨부된 파일이 없습니다.') != -1) {
                    document.querySelector('.marker-file-attach').textContent = '';
                }
                if(fileList.get(e.currentTarget.files.item(0).name) != null){
                    alert('이미 첨부된 파일입니다.');
                } else {
                    /*fileList.set(fileId.files[0].name, fileId.files[0]);*/
                    fileList.set(e.currentTarget.files.item(0).name, e.currentTarget.files.item(0));
                    document.querySelector('.marker-file-attach').append(fileAttachAppendData());
                    var input = document.querySelectorAll('.marker-file-attach input');
                    input[(input.length - 1)].value = fileId.files[0].name;
                }
            }
            document.querySelectorAll('.marker-file-attach button').forEach(function (e, v) {
                e.addEventListener('click', function (el) {
                    fileList['delete'](el.target.parentNode.firstElementChild.value);
                    el.target.parentElement.parentElement.remove();
                    if (document.querySelector('.marker-file-attach').childElementCount == 0) {
                        document.querySelector('.marker-file-attach').textContent = '첨부된 파일이 없습니다.';
                    }
                });
            });
        });
        return fileId;
    }

    this.fade = function (element) {
        element.style.display = 'inline';
        var op = 1;  // initial opacity
        var timer = setInterval(function () {
            if (op <= 0.1) {
                clearInterval(timer);
                element.style.display = 'none';
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, 50);
    }

    this.processAsyncAjaxTest = function (type, success, fail) {
        this.callbackS = success;
        this.callbackF = fail;

        this.instance.open(this.info.method, this.info.url, true);
        /*this.instance.setRequestHeader(this.info.csrfHeader, this.info.csrfToken);*/
        this.instance.setRequestHeader('Content-Type', type);
        this.instance.setRequestHeader('Authorization', 'Bearer eyJjb21wYW55TmFtZSI6InJhb25TbmMiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwOjA6MDowOjA6MDowOjEiLCJpYXQiOjE2NTI2ODgxMTAsImV4cCI6NDgwODQ0ODExMH0.1uZB750rmur8N_R1D6Q_7l8YU8OjX0LcQ6qfaC-1pfI');
        this.instance.send();
        this.instance.onload = function (event) {
            checkServerStatus(event, success, fail);
        }
    }

}
