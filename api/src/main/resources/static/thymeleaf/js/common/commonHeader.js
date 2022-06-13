function Header() {
    "use strict";

    this.SUBJECT = document.querySelectorAll('.marker-subject .contents_box button');
    this.MENU = document.querySelectorAll('.marker-menu li a');
    this.FUNC = {SUCCESS:{},FAIL:{},COMMON:{}};
    this.DATA = {};
    this.URL = {PATH:{},PARAM:[]};

    var SUB = document.querySelector('img[alt="한국수력원자력 로고"]');
    var SUB_TEXT = document.querySelector('header a h2');
    this.imgClickEvent = function(url){
        SUB.addEventListener('click', function(){
            window.location.href = url;
        });
        SUB_TEXT.addEventListener('click', function(){
            window.location.href = url;
        });
    }
}
