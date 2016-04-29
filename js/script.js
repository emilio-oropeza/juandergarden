$(document).ready(function(){
	$("#portada").height(screenHeight());
	$(window).resize(function(){
		$("#portada").height(screenHeight());
	});
	$("#video-player-cont").proyectVideo({
		videos:["u_TpWWZyoCM","IRhhIVEmfE8","fh1Y1TfV86U"],
		image:urlIndepth+"images/viejos-2000/lucecita1.svg"
	});
	$('.my-flipster').flipster({
		buttons: true,
		start: 1,
		scrollwheel: false
	});
	$(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
	    event.preventDefault();
	    $(this).ekkoLightbox();
	});
});

function screenHeight(){
	var height = $(window).height();
	return height - 60;
}