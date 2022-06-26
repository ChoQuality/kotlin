$(function (){
	var setting_total=$('.setting_box li').length;

	for(i=0;i<setting_total;i++){
		if($('.setting_box li').eq(i).find('img').length!=0){
			$('.setting_box li').eq(i).find('.contents_box').addClass('have');
		};
	};
	$('.setting_box .cont_box').on('click',function(){
		var $target=$(this).find('img').length;
		if($target==0){
			return false;
		};
	});

	//이미지 롤오버 
	 $(".setting_box .cont_box").on('mouseenter',function(){
		var $target=$(this).find('img').length;
		if($target==1){
			var file = $(this).find('img').attr('src').split('/');
			var filename = file[file.length-1];
			var path = '';
			for(i=0 ; i < file.length-1 ; i++){
			 path = ( i == 0 )?path + file[i]:path + '/' + file[i];
			};
			$(this).find('img').attr('src',path+'/'+filename.replace('_off.','_on.'));
		};		
	 });
	 $(".setting_box .cont_box").on('mouseleave',function(){
		var $target=$(this).find('img').length;
		if($target==1){
			var file = $(this).find('img').attr('src').split('/');
			var filename = file[file.length-1];
			var path = '';
			for(i=0 ; i < file.length-1 ; i++){
			 path = ( i == 0 )?path + file[i]:path + '/' + file[i];
			};
			$(this).find('img').attr('src',path+'/'+filename.replace('_on.','_off.'));
		};
	 });

	/*//popup_poll
	$('button.img_box').on('click',function(event){
		var $target=$(event.target);

		if($target.is('.active button.img_box,.active button.img_box >')){
			$('.setting_box').find('.cont_box').removeClass('active');
		}else{
			$('.setting_box').find('.cont_box').removeClass('active');
			$(this).parent('.cont_box').addClass('active');
		};
	});*/
});