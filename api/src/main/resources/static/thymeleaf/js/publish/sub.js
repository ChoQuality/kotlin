jQuery(function(){
	var body_height=window.innerHeight;
	$('#side:before').css({height:body_height-100});


	//snb
	$('#side a').parents('ul').prev('a').addClass('child_dep');
	$('.side_menu .dep3').prev('a').on('click',function(event){
		var $target=$(event.target);
		if($target.is('.on')){
			$('.side_menu .dep1 > li > a').removeClass('on').next('ul').removeClass('dep2_on').find('a').removeClass('on').next('ul').removeClass('dep3_on');
		}else{
			$('.side_menu .dep1 > li > a').removeClass('on').next('ul').removeClass('dep2_on').find('a').removeClass('on').next('ul').removeClass('dep3_on');
			$(this).addClass('on').next('ul').addClass('dep3_on')
		};
		return false;
	});
	$('.side_menu .dep2').prev('a').on('click',function(event){
		var $target=$(event.target);
		if($target.is('.on')){
			$('.side_menu .dep1 > li > a').removeClass('on').next('ul').removeClass('dep2_on').find('a').removeClass('on').next('ul').removeClass('dep3_on');
		}else{
			$('.side_menu .dep1 > li > a').removeClass('on').next('ul').removeClass('dep2_on').find('a').removeClass('on').next('ul').removeClass('dep3_on');
			$(this).addClass('on').next('ul').addClass('dep2_on')
		};
		return false;
	});
});

function side_menu(fir,sec,thi){
	if(typeof(thi)=='undefined'){
		$('.side_menu > ul > li:nth-child('+fir+') > a').addClass('on2').next('ul').addClass('current').find('> li:nth-child('+sec+') > a').addClass('on2');
	}else if(typeof(sec)=='undefined'){
		$('.side_menu > ul > li:nth-child('+fir+') > a').addClass('on2');
	}else{
		$('.side_menu > ul > li:nth-child('+fir+') > a').addClass('on2').next('ul').addClass('current').find('> li:nth-child('+sec+') > a').addClass('on2').next('ul').addClass('current').find('li:nth-child('+sec+') a').addClass('on2');
	};
};