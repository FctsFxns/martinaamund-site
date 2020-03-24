$(function() {
	function removeHash() { 
	    var scrollV, scrollH, loc = window.location;
	    if ("pushState" in history)
	        history.pushState("", document.title, loc.pathname + loc.search);
	    else {
	        scrollV = document.body.scrollTop;
	        scrollH = document.body.scrollLeft;
	        loc.hash = "";
	        document.body.scrollTop = scrollV;
	        document.body.scrollLeft = scrollH;
	    }
	}
	function adjustVideo(video, container, isMobile) {
		var $front_movie_w = video.attr('data-video-width');
		var $front_movie_h = video.attr('data-video-height'); 
		var $front_rw = ($front_movie_h / $front_movie_w) * 100;
		var $front_rh = ($front_movie_w / $front_movie_h) * 100;
		$(video)
			.css('height', $front_rw+'vw');	
		$("iframe", video)
			.css('height', $front_rw+'vw')
			.css('top', 'calc(' + $front_rw + 'vw / 2)');	
		if (isMobile) {
			var h = window.innerHeight - $(video).height(); 
			$(container).css('min-height', h + 'px');

		} else {
			$(container).css('min-height', 'calc(100vh - ' + $front_rw + 'vw )');
		}
		return true;
	}
	function closeFullScreen() {
		var elem = document.getElementById("video"); 
	  if (element.exitFullscreen) {
	    elem.exitFullscreen();
	  } else if (elem.msExitFullscreen) {
	    elem.msExitFullscreen();
	  } else if (elem.mozCancelFullScreen) {
	    elem.mozCancelFullScreen();
	  } else if (document.webkitExitFullscreen) {
	    elem.webkitExitFullscreen();
	  }
	}

	function openFullScreen() {
		var elem = document.getElementById("video"); 
	  if (elem.requestFullscreen) {
	    elem.requestFullscreen();
	  } else if (elem.mozRequestFullScreen) { /* Firefox */
	    elem.mozRequestFullScreen();
	  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
	    elem.webkitRequestFullscreen();
	  } else if (elem.msRequestFullscreen) { /* IE/Edge */
	    elem.msRequestFullscreen();
	  }
	}

	var $body = $('body');
	var $isMobile = false; //initiate as false for mobile detection
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
	    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
	    $isMobile = true;
	}
	var $t = ('ontouchstart' in document.documentElement && navigator.userAgent.toLowerCase().indexOf('chrome') == -1)
	if ($isMobile || $t) {
		$isMobile = true;
		$('html').addClass('is-mobile')
    $body.addClass('is-mobile');
	}

  var $hamburger = $(".hamburger", $body);
  var $menu = $(".navbar-collapse", $body);
	$hamburger.on("click", function(e) {
		if ($body.hasClass('navbar-collapse-on')) {
			$menu.switchClass('slide-in','slide-out');
		} else {
			$menu.switchClass('slide-out','slide-in');
		}
    $hamburger.toggleClass('is-active');
    $body.toggleClass('navbar-collapse-on');
	});

	var $front = $(".vimeo-homepage-wrapper", $body);
	var $works = $(".works-list", $body);
	var $bg = $("#works-bg", $body);
	if ($isMobile) {		
		var $sArea = $("#works .swipe-area", $body);
		$sArea
			.attr('data-work-index', 0)
			.attr('data-work-count', $('li', $works).length);
		function changeWork(index, cb) {
			// $('.bg-nav').css('opacity', 0);
			$bg.css('opacity', 0);
			window.setTimeout( function(){
				$('li h3', $works).eq(index).trigger('mouseleave');
				window.setTimeout( function(){
					cb(false);
				}, 125);
			}, 125);
		}
	  $sArea.show().swipe({ 
	    swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
      	var index = parseInt($(this).attr('data-work-index'), 10);
	      if (direction == 'up') {
					if (index < $(this).attr('data-work-count') - 1) {

						$("html, body").animate({ scrollTop: $("#content", $body).offset().top });

						changeWork(index, function(){
							index++;
							$('li h3', $works).eq(index).trigger('mouseenter');
							$sArea.attr('data-work-index', index);			      
			      	$works.css('margin-top', function (index, curValue) {
			      		  var h = $('.works-list li', $body).eq(0).outerHeight(true);
							    return parseInt(curValue, 10) - h + 'px';
							}).css('margin-bottom', function (index, curValue) {
			      		  var h = $('.works-list li', $body).eq(0).outerHeight(true);
							    return parseInt(curValue, 10) + h + 'px';
							});						
						});
					} else {
		      	$works.css('margin-top', 0).css('margin-bottom', 0);
		      	$("html, body").animate({ scrollTop: $("#works", $body).offset().top }, "slow", 
		      		function(){
				      	$('li h3', $works).eq(0).trigger('mouseenter');
				      	$sArea.attr('data-work-index', 0)
		      		}
		      	);
					}
	      } else if (direction == 'down') {
					if (index > 0) {
						$("html, body").animate({ scrollTop: $("#content", $body).offset().top });
						changeWork(index, function(){
							index--;
							$('li h3', $works).eq(index).trigger('mouseenter');
							$sArea.attr('data-work-index', index);
			      	$works.css('margin-top', function (index, curValue) {
			      		  var h = $('.works-list li', $body).eq(0).outerHeight(true);
							    return parseInt(curValue, 10) + h + 'px';
							}).css('margin-bottom', function (index, curValue) {
			      		  var h = $('.works-list li', $body).eq(0).outerHeight(true);
							    return parseInt(curValue, 10) - h + 'px';
							});						
						});
		      } else {
		      	$works.css('margin-top', 0).css('margin-bottom', 0);
		      	$sArea.attr('data-work-index', 0)
		      	$("html, body").animate({ scrollTop: 0 }, "slow", function(){
							$('.line', $works).css('margin-left', 0);
							$('.mobile-line', $works).css('width', 0);
							$('.details', $works).hide();
							$('h3', $works).removeClass('actived');
							$body.removeClass('works-list-hover');
							$bg.css('background-image', "none").css('opacity', 0);
		      	});
	      	}
	      } else if (direction == 'left' ) {
	      	if (index < $(this).attr('data-work-count') ) {
		      	$sArea.trigger('click');
	      	}

	      } else if (direction == null ) {
	      	if (index < $(this).attr('data-work-count') ) {
		      	$sArea.trigger('click');
	      	}
	      }
	    },
	     threshold: 0
	  });

		$('#works-featured .clicker', $body).swipe({
			swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
				if (direction == 'down' || direction == 'up')  {
					$("html, body").animate({ scrollTop: $("#works", $body).offset().top }, "slow", function(){
						$('.works-list li h3', $body).eq(0).trigger('mouseenter');
					});
				}
			},
	    threshold: 0	  
		});

	  $sArea.on('click', function(event){
  	  event.preventDefault();
	  	var index = parseInt($(this).attr('data-work-index'), 10);
	  	window.location.href = $('li h3', $works).eq(index).find('a').attr('href');
	  });		

	}  else {
		$('#works-featured .clicker', $body).on('click', function(event){
			$.scrollify.next();
	    event.preventDefault();
	    event.stopPropagation(); 
		});
	}

	if(window.location.hash == '#works' && $('body.body-home').length > 0)  {
		$("html, body").animate({ scrollTop: $("#content", $body).offset().top }, "slow", function(){
      if ($isMobile) {
				$("#works .swipe-area", $body).attr('data-work-index', 0);	
				$works.css('margin-top', 0).css('margin-bottom', 0);	
				$('.works-list li h3', $body).eq(0).trigger('mouseenter');	
			}
		});
    removeHash();
	}		
	if(window.location.hash.substring(0, 6) == '#film-' && $('body.body-home').length > 0)  {
		var current = $('.works-list li h3', $body).filter(window.location.hash).attr('data-work-id');
		$("html, body").animate({ scrollTop: $("#content", $body).offset().top }, "slow", function(){
      if ($isMobile) {
	    	$("#works .swipe-area", $body).attr('data-work-index', current);
	    	$works.css('margin-top', function (index, curValue) { 
	    		  var h = $('.works-list li', $body).eq(0).outerHeight(true);
	    			var offset = h * parseInt(current, 10);   			
				    return parseInt(curValue, 10) - offset + 'px';
				});	
				$('.works-list li h3', $body).eq(current).trigger('mouseenter');
			}
		});
  	removeHash();
	}		
	var $headerBg = $('header .bg-nav', $body);
	var $header = $('body.body-home header');
	if ($header.length > 0) {
		var $footer = $('footer', $body);	
		var main_scroll = function() {
			var scrollTop     = $(window).scrollTop(),
	    elementOffset = $header.offset().top ,
	    distance      = (elementOffset - scrollTop - $header.height());
			if(distance < 240) {
		     $headerBg.css('opacity', 1);
		     $footer.slideDown('fast');
		  } else {
		     $headerBg.css('opacity', 0);
		     $footer.slideUp('fast');
		  }
		};
		var scroll_function = _.debounce(main_scroll, 300);
		$(window).on('scroll resize', scroll_function);
		main_scroll(); 
	}
	// @see: https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html#//apple_ref/doc/uid/TP40006511-SW24
	if ($('body.body-home')[0]) {
	  if ($isMobile) {
			document.addEventListener('touchmove', function(e) {
			    e.preventDefault();
			}, { passive: false });	  	
			$(document).bind('MozTouchMove', function(e){e.preventDefault();});  
			var mNbr = 160;
	  } else {
			var mNbr = 95;
	  }
		function doOnOrientationChange() {
				var vh = window.innerHeight * 0.01;
				document.documentElement.style.setProperty('--vh', '${vh}px');
			  var space = window.innerHeight - $('header .navbar .navbar-brand', $body).offset().top + $('header .navbar .navbar-brand', $body).height() ;
			  if ((space/vh > 15) || parseInt(space, 10) < 100 || parseInt(space, 10) > 120) {
					var alfa = ((vh / 27) * 30);
					var mt = mNbr - alfa;
					$('header .navbar .navbar-brand', $body).css('margin-top','-' + mt + 'px');
					$('header ul.navbar-nav', $body).css('margin-top','-' + mt + 'px');
					$('header .navbar .bg-nav', $body).css('margin-top','-' + mt + 'px')
					$('body.body-home header').css('top', mt + 'px');
			  }
			  $('body.body-home header').css('opacity', 1);	
		}
		window.addEventListener('orientationchange', doOnOrientationChange);
		doOnOrientationChange();
	}
	if ($('body.body-home')[0]) {
	  if (!$isMobile) {
			$.scrollify({
			    section : ".snap-block",
			    sectionName : false,
			    interstitialSection : "",
			    standardScrollElements: "",
			    easing: "linear",
			    scrollSpeed: 300,
			    offset : 0,
			    scrollbars: true,
			    setHeights: false,
			    overflowScroll: true,
			    updateHash: false,
			    touchScroll:false,
			    before:function(index, sections) {
			    	if (index == 0) {
					     $('header .bg-nav').css('opacity', 0);
					     $('footer').slideUp('fast');			    		
			    	}
			    },
			    after:function(index, sections) {
						if(index > 0) {
					     // $footer.show();
					     $('header .bg-nav').css('opacity', 1);
					     $('footer').slideDown('fast');
					
					  }
			    },
			    afterResize:function() {
			    	$.scrollify.update();
			    }
			});
		 }
	}
  $('body.body-home header .navbar-nav-desktop .nav-item a').click(function(event) {
    event.preventDefault();
    event.stopPropagation(); 
  	$("html, body").animate({ scrollTop: $(this.hash).offset().top }, "slow", function(){
	      if ($isMobile) {
		  		$('li h3', $works).eq(0).trigger('mouseenter');
					$("#works .swipe-area", $body).attr('data-work-index', 0);	
					$works.css('margin-top', 0).css('margin-bottom', 0);		
				}
				removeHash();
	      history.pushState("", document.title, window.location.pathname + window.location.search); // remove the has	
	  	});
  });
  $('body.body-home header .navbar-nav-mobile .nav-item a').click(function(event) {
    if (this.hash) {
	    event.preventDefault();
	    event.stopPropagation(); 
	    $hamburger.trigger('click');
	  	$("html, body").animate({ scrollTop: $(this.hash).offset().top }, "slow", function(){
	      if ($isMobile) {
		  		$('li h3', $works).eq(0).trigger('mouseenter');
					$("#works .swipe-area", $body).attr('data-work-index', 0);		
					$works.css('margin-top', 0).css('margin-bottom', 0);	
				}
				removeHash();
	  	});
    }
  });
  if ($works.length > 0) {
		$('li h3', $works).on('mouseenter', function(event){
			$('.line', $works).css('margin-left', 0);
			$('.mobile-line', $works).css('width', 0);
			$('.details', $works).hide();
			$('h3', $works).removeClass('actived');
			var x = $('a', this).position();
			var w = ($('a', this).width() + 10); 
			var i = $(this).attr('data-work-id');
			$('.line', this).css('margin-left', w + "px");
			$('.mobile-line', this).css('width', x.left + "px");
			$(this).addClass('actived');
			$body.addClass('works-list-hover');
			$bg.css('background-image', "url(" + $('a', this).attr("data-img-src") + ")");
			$bg.css('opacity', 1);
			$(this).next('.details').show();
	    event.preventDefault();
		});

		$('li h3', $works).on('mouseleave', function(event){
			$('.line', $works).css('margin-left', 0);
			$('.mobile-line', $works).css('width', 0);
			$('.details', $works).hide();
			$('h3', $works).removeClass('actived');
			$body.removeClass('works-list-hover');
			$bg.css('opacity', 0);
	    event.preventDefault();
		});

		if ($('.preload-image', $works).length > 0) {
			var p = new Vimeo.Player('video');
			p.on('play', function(data) {
				$('.preload-image', $works).each(function(index){
					var $img = $(this).attr('data-img-src');
					$(this).attr('style', 'background: url("' + $img + '") no-repeat -9999px -9999px;');
				});			
			});
		}
	}
	if (!$isMobile) {			
		$('.contact-item h3', $body).on('mouseenter', function(event){
	    event.preventDefault();
	    event.stopPropagation(); 
			$('.contact-list-infos .details').hide();
			$('.contact-list-infos .form-wrapper').hide();
			$('.contact-list-infos h3').removeClass('active');
			$(this).toggleClass('active').parent().find('.details').show().parent().find('.form-wrapper').show();
		});
	}	
	if ($isMobile) {			
		$('.contact-item h3', $body).on('click', function(event){
	    event.preventDefault();
	    event.stopPropagation(); 
			$('.contact-list-infos .details').hide();
			$('.contact-list-infos .form-wrapper').hide();
			$('.contact-list-infos h3').removeClass('active');		
			$(this).toggleClass('active').parent().find('.details').show().parent().find('.form-wrapper').show();		
		});
	}
	var $form = $('form');
	$('.btn-back', $form).on('click', function(event){
		  event.preventDefault();
		  event.stopPropagation(); 
    	$('#contact-msg', $body).fadeOut('slow', function(){
    		// Show message error
    		$('.contact-controls').fadeIn();
    		$(".btn-back").hide();
    		$("#contact-msg-error").hide();
    		$("#contact-msg-success").hide();
    	});
	});
	$('.btn-form', $body).on('click', function(event){
			var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	    	$("html, body").animate({ scrollTop: $(this).offset().top }, "slow");
	});
  var forms = document.getElementsByClassName('needs-validation');
  var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      } else {
      	event.preventDefault();
        event.stopPropagation();
	      var url = form.action;
	      $.ajax({
	          type: "POST",
	          url: url,
	          data: $(this).serialize(),
	          error: function(data, text, error) {
            	$('.contact-controls').fadeOut('slow', function(){
            		$('#contact-msg').css("display", 'flex').hide().fadeIn();
            		$('#contact-msg-error').fadeIn();
            		$(".btn-back").show();
            	});
	          },
	          success: function (data)
	          {
              if (data.type == 'success') {
              	$('.contact-controls').fadeOut('slow', function(){
              		$('#contact-msg').css("display", 'flex').hide().fadeIn();
              		$('#contact-msg-success').fadeIn('slow', function(){
              			$(".btn-back").show();
              		});
              		$('#contact-form').removeClass('was-validated');
          				$('#contact-form')[0].reset();
              	});
              } else {
              	$('.contact-controls').fadeOut('slow', function(){
              		$('#contact-msg').css("display", 'flex').hide().fadeIn();
              		$('#contact-msg-error').fadeIn('slow', function(){
              			$(".btn-back").show();
              		});
              	});
              }
              return false;
	          }
	      });
	      return false;   

      }
      form.classList.add('was-validated');     
     
    }, false);
  });
	var $work_video = $("aside#post-video");
	var $work = $("section#post");
	var $player = $(".vimeo-wrapper", $work_video);
	adjustVideo($player, $work, $isMobile);
	$('.btn-play', $player).click(function(event){
		event.preventDefault();
    event.stopPropagation();
		var player = new Vimeo.Player('video');
		player.play();    
		openFullScreen();
		player.on('ended', function(data) {
			closeFullScreen()
			player.off('ended');
		});
		player.getPaused().then(function(paused) {
			if (paused) {
				closeFullScreen();
			} else {
				openFullScreen();
			}
		});
	});
});
