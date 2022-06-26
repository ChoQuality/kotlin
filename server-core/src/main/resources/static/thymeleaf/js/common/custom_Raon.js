
function getTestJsonData(method, url, param, func) {
    $.ajax({
        type : method 		// 전송타입
        ,url : url 			// 액션
        ,data : param 		// 파라미터
        ,dataType : "json"	// 데이타타입은 json으로 설정
        ,cache : false		// 캐시저장안함
        ,success : function(data,status,xhr) { //요청 성공하면
            func(xhr);
        } //success end
        ,error : function(xhr, textStatus, errorThrown) { //요청 실패하면
            if(textStatus == "error") {
                setAjaxErrorMsg(xhr);
            }
        } //error end
    }); //ajax end
}

function getJsonData(method, url, param) {

    var returnJson = "";
    $.ajax({
        type : method 		// 전송타입
        ,url : url 			// 액션
        ,data : param 		// 파라미터
        ,dataType : "json"	// 데이타타입은 json으로 설정
        ,async : false		// 동기형태로 실행
        ,cache : false		// 캐시저장안함
        ,beforeSend : function(xhr){

        }
        ,success : function(data,status,xhr) { //요청 성공하면
            returnJson = xhr; //return받은 결과를 json 객체로 parsing함.
        } //success end
        ,error : function(xhr, textStatus, errorThrown) { //요청 실패하면
            if(textStatus == "error") {
                setAjaxErrorMsg(xhr);
            }
        } //error end
    }); //ajax end

    return returnJson;
}

function getJsonMultiData(url, frm) {

    var returnJson = "";

    $("#" + frm).ajaxForm({
        url : url,
        enctype : "multipart/form-data",
        dataType : "json",
        processData : false,
        contentType : false,
        async : false,
        success:function(data,status,xhr){
            returnJson = xhr;
        },
        error : function(xhr, textStatus, errorThrown) { //요청 실패하면
            if(textStatus == "error") {
                setAjaxErrorMsg(xhr);
            }
        } //error end
    });
    $("#" + frm).submit();

    return returnJson;
}

//메세지 호출
function fnAlert(tit,msg,type,url){
    var headTit = "";
    if("e" == type){
        headTit = "Error";
    }else if("i" == type){
        headTit = "정보";
        $(".cpt-popup.reg01.msgPop .error-msg-field").removeClass("on");
        $(".cpt-popup.reg01.msgPop .error-btn-field .link-detail").hide();
    }else if("l" == type){
        headTit = "정보";
        $(".cpt-popup.reg01.msgPop .error-msg-field").removeClass("on");
        $(".cpt-popup.reg01.msgPop .error-btn-field .link-detail").hide();
        $(".cpt-popup.reg01.msgPop input[name=returnUrl]").val(url);
    }else{
        headTit = "정보";
        $(".cpt-popup.reg01.msgPop .error-msg-field").removeClass("on");
        $(".cpt-popup.reg01.msgPop .error-btn-field .link-detail").hide();
    }

    $(".cpt-popup.reg01.msgPop .pop-head .error-head-tit").html(headTit);
    $(".cpt-popup.reg01.msgPop .error-tit-field .tit").html(tit);
    $(".cpt-popup.reg01.msgPop .error-msg-field").html(msg);
    msgPopOpen();
}

//resultCode 99일때 메세지 표출
function setResultCode99Msg(data){
    fnAlert(data.result.resultMsg, data.result.exceptionCont, "e");
}

//AJAX 에러 메세지 세팅
function setAjaxErrorMsg(xhr){
    $("#errorResponseText").html(xhr.responseText);
    var tit = "처리중 오류가 발생하였습니다.";
    fnAlert(tit, $("#errorResponseText p.error"), "e");
    $("#errorResponseText").html("");
}

//메세지 팝업 열기
function msgPopOpen(){
    $(".cpt-popup.reg01.msgPop").addClass("active");
    $("body").css("overflow", "hidden");
    $("button[name=alertCloseBtn]").focus();
}

//메세지 팝업 닫기
function msgPopClose() {
    $(".cpt-popup.reg01.msgPop").removeClass("active");
    $("body").css("overflow","auto");
    if($(".cpt-popup.reg01.msgPop input[name=returnUrl]").val() != ""){
        location.href = $(".cpt-popup.reg01.msgPop input[name=returnUrl]").val();
    }
}

//메세지 팝업 상세보기
function msgPopDtlOpenClose(){
    if($(".cpt-popup.reg01.msgPop .error-msg-field.on").length > 0){
        $(".cpt-popup.reg01.msgPop .error-msg-field").removeClass("on");
    }else{
        $(".cpt-popup.reg01.msgPop .error-msg-field").addClass("on");
    }
}

//AJAX 엑셀다운로드 중복호출 방지
var doubleSubmitFlag = false;
function doubleSubmitCheck(){
    if(doubleSubmitFlag){
        return doubleSubmitFlag;
    }else{
        doubleSubmitFlag = true;
        setTimeout(function(){doubleSubmitFlag = false; }, 1000);

        return false;
    }
}

//바이트 수 계산
function fnGetByte(str){
    var byte = 0;
    for(var i=0;i<str.length;i++){
        if(str.charCodeAt(i)>127){
            byte+=3;
        }else{
            byte++;
        }
    }
    return byte;
}

//최대 등록 가능 길이
function fnGetTxtLength(length){
    return Math.trunc(length/3);
}

//휴대폰 번호 유효성검사
function fnValidMobilePhone(pNum) {
    var target = pNum.replace(/-/gi, "").trim();
    return /01[016789][^0][0-9]{2,3}[0-9]{3,4}/.test(target);
}