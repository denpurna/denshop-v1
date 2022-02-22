import $ from "jquery";

	$('.js-btn-menu').on('click', function(){
		$(this).toggleClass('active');
		$('.header-box').toggleClass('active');
		$('html').toggleClass('scroll-off');
	});

	$('.content').on('click', function(){
		$('.js-btn-menu').removeClass('active');
		$('.header-box').removeClass('active');
		$('html').removeClass('scroll-off');
	});

	
	$('.header-nav li a').on('click', function(e){
		// e.preventDefault();
		$(this).parent().siblings('li').find('ul').removeClass('active');
		$(this).parent().find('ul').toggleClass('active');
	});