$(document).ready(function($){
	if( (navigator.userAgent.match(/Android/i)|| navigator.userAgent.match(/webOS/i)|| navigator.userAgent.match(/iPhone/i)|| navigator.userAgent.match(/iPad/i)|| navigator.userAgent.match(/iPod/i)|| navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) )||$(window).width() <= 768){
	// if($(window).width() <= 768){
		$( ".spacer" ).remove();
		$('.intro').css('z-index','2');
	}
	else{
		$(window).stellar();
		$('.scrollTo').click(function(e) {
			e.preventDefault();
			var bandId = $(this).attr('href');
			console.log(bandId);

			$('html, body').animate({
					scrollTop: $(bandId).offset().top}, 'slow'
			);

		});
	}

	$(".spacer").css("height",$(window).height()+'px');
	$(".intro").attr("height",$(window).height()+'px');
	$( window ).resize(function() {
		if($(window).width() <= 768){
			$( ".spacer" ).remove();
		}
		else {
			if($('.spacer').length==0){
				$('body').prepend('<div class="spacer"></div>');
			}
		}
		$(".spacer").css("height",$(window).height()+'px');
		$(".intro").attr("height",$(window).height()+'px');
	});



});
