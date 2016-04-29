
(function($){
	$.fn.proyectVideo = function(options){
		return this.each(function() {
			var element = $(this);						
			if (element.data('proyectVideo')) return;
			var myplugin = new ProyectVideo(this, options);
			element.data('proyectVideo', myplugin);
			element.data('proyectVideo').methods.init();			
		});
	};
	
	var ProyectVideo = function(target, options ){
		var componentObj = {
			videoembedStart:'<iframe width="100%" height="100%" src="https://www.youtube.com/embed/',
			videoembedEnd:'" frameborder="0" allowfullscreen></iframe>',
			videos: [],
			videoHolder: null,
			videoContainer: null,
			videoLuz: null,
			index: 0,
			isOpen: false,
			methods:{
				init:function(){
					componentObj.methods.initVideos();
					componentObj.methods.display();
					$(window).resize(componentObj.methods.resize);
					$(".img-btn").each(function(i, val){
						$(this).on("click", function(){
							componentObj.methods.changeVideo(i);
						});
					});
				},
				display: function(){
					componentObj.videoHolder = $('<div id="holder"></div>').appendTo(target);
					componentObj.videoContainer = $('<div id="container"></div>').appendTo(componentObj.videoHolder);
					componentObj.videoLuz = $('<div id="luz"></div>').appendTo(componentObj.videoHolder);
					var video1 = $(componentObj.videos[0]).appendTo(componentObj.videoContainer);
					var video2 = $(componentObj.videos[1]).appendTo(componentObj.videoContainer);					
					var video3 = $(componentObj.videos[2]).appendTo(componentObj.videoContainer);
					$(video1).addClass("videos");
					$(video2).addClass("videos");
					$(video3).addClass("videos");
					$(".videos").css({display:"none"});
					$(target).css({
						position: 'relative',
						margin: 'auto'
					});
					$(componentObj.videoHolder).css({
						position: 'absolute',
						bottom: '0px',
						overflow: 'hidden',
						height: '100%'
					});
					$(componentObj.videoContainer).css({
						position: 'absolute',
						height: "100%",
						"z-index":"2"
					});
					$(componentObj.videoLuz).css({
						'position': 'absolute',
						'width': '100%',
						'bottom': '0px',
						'z-index': '1',
						'left': '0px',
						'background-image': 'url("'+options.image+'")',
						'height': '100%',
						'background-position': 'center bottom',
						'background-repeat': 'no-repeat',
						'background-size': '100% auto'
					});
					componentObj.methods.resize();
				},
				resize:function(){
					if($(window).width() <= 768){
						var height = $(window).width() / 2;
						$(target).css({
							width: "100%",
							height: height
						});						
						$(componentObj.videoHolder).css({
							width: "100%"
						});
						$(componentObj.videoContainer).css({
							width: "100%",
							"height": "100%",
							bottom: 0
						});						
						$(componentObj.videoLuz).css({display:"none"});
					}else{
						var width = "";
						var height = "";
						var bottom = "";
						if($(window).width() <= 992){
							width = "470px";
							height = "265px";
							bottom = "60px";
							$(target).css({
								width: width,
								height: '325px'
							});
						}else{
							width = "608px";
							height = "342px";
							bottom = "77px";
							$(target).css({
								width: width,
								height: '420px'
							});
						}						
						$(componentObj.videoHolder).css({
							width: width,
							height: (componentObj.isOpen)?"100%":"18%"
						});
						$(componentObj.videoContainer).css({
							width: width,
							height: height,
							bottom: bottom
						});						
						$(componentObj.videoLuz).css({
							display:"block"
						});
					}					
				},
				changeVideo: function(video){
					var height = ($(window).width() > 768)?"18%":"0%"
					$(componentObj.videoHolder).animate({
						height:height
					}, {
						duration: 500,
						complete: function(){							
							$(componentObj.videoHolder).animate({
								height:"100%"
							}, {
								duration:2000,
								start: function(){
									$(".videos").hide();
									var x = $(".videos").get(video);
									$(x).show();
								},
								complete: function(){
									componentObj.isOpen = true;
								}
							});
						}
					});
					
				},
				initVideos: function(){
					for (var i = 0; i < options.videos.length; i++) {
						componentObj.videos[i] = componentObj.videoembedStart + options.videos[i] + componentObj.videoembedEnd;
					}
				}
			}
		};
		return componentObj;
	};	
})(jQuery);