/*
function CustomUploadFile(setOn, func){
    this.setOn = setOn;
    this.func = func;
    this.fileList = new Map();

    this.setSelectFileEvent = function (id) {
        var fileId = document.getElementById(id);
        fileId.addEventListener('change', function (e) {

            if(document.querySelector('.marker-file-attach').textContent.indexOf('첨부된 파일이 없습니다.') != -1){
                document.querySelector('.marker-file-attach').textContent ='';
            }

            this.fileList.set(fileId.files[0].name,fileId.files[0]);
            document.querySelector('.marker-file-attach').append(fileAttachAppendData());
            var input = document.querySelectorAll('.marker-file-attach input');
            input[(input.length-1)].value = fileId.files[0].name;

            document.querySelectorAll('.marker-file-attach button').forEach(function (e,v) {
                e.addEventListener('click',function () {
                    this.fileList.delete(e.parentElement.firstElementChild.value);
                    e.parentElement.parentElement.remove();
                    if(document.querySelector('.marker-file-attach').childElementCount == 0 ){
                        document.querySelector('.marker-file-attach').textContent ='첨부된 파일이 없습니다.';
                    }
                });
            });
        });
        return fileId;
    }
    this.fileUploadEvent = function (updateButton,editor,editorId,callbackSuccess,callbackFail){
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
            for (const [key, value]  of this.fileList.entries())
            {
                formData.append('files',value);
            }
            formData.append('title', document.querySelector('.subject').firstElementChild.value);
            formData.append('content', editor.getById[editorId].getContents());

            setInfoAsyncAjax("POST",path, formData,callbackSuccess,callbackFail);
            processFileAsyncAjax();
        });
    }
}*/
