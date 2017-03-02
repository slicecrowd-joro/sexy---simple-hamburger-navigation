$(document).ready(function () {
	var tlMouseEnter = new TimelineMax({paused: true}),
			tlClick = new TimelineMax({paused: true}),
			tlClickClose = new TimelineMax({paused: true}),
			topLine = $('.top-line'),
			middleLine = $('.middle-line'),
			bottomLine = $('.bottom-line'),
			menuLine = $('.menu-line'),
			checking = false,
			animating = false,
			speed15ms = 0.15,
			speed20ms = 0.2,
			menuWrapper = $('.menu-wrapper'),
			navList = $('.nav-list');

	tlMouseEnter
		.to(menuLine, speed15ms, {
			width: '6px',
			height: '6px',
			borderRadius: '50%',
			ease: Sine.easeInOut
		})
		.to(topLine, speed15ms, {
			x: 24,
			y: 6
		}, '-=' + speed15ms)
		.to(middleLine, speed15ms, {
			x: 12,
			y: 0
		}, '-=' + speed15ms)
		.to(bottomLine, speed15ms, {
			x: 0,
			y: -6
		}, '-=' + speed15ms);

	tlClick
		.to(topLine, speed20ms, {
			x: 12,
			onStart: function() {
				checking = true,
				animating = true;
			}
		})
		.to(bottomLine, speed20ms, {
			x: 12
		}, '-=' + speed20ms)
		.to(middleLine, 0.1, {
			x: -6, 
			y: -18, 
			width: 40, 
			height: 40, 
			borderRadius: '50%',
			ease: Sine.easeInOut
		}, '+=0.10')
		.to(topLine, speed20ms, {
			width: 20,
			height: 3,
			x: 4,
			y: 6,
			zIndex: 1,
			borderRadius: 0,
			rotation: 45,
			backgroundColor: '#fff',
			ease: Sine.easeInOut
		}, '-=0.16')
		.to(bottomLine, speed20ms, {
			width: 20,
			height: 3,
			x: 4,
			y: -6,
			zIndex: 1,
			borderRadius: 0,
			rotation: -45,
			backgroundColor: '#fff',
			ease: Sine.easeInOut,
			onComplete: function() {
				animating = false;
			}
		}, '-=' + speed20ms);

	tlClickClose
		.to(topLine, speed20ms, {
			width: 0,
			x: 13,
			rotation: 0,
			onStart: function() {
				animating = true;
			}
		})
		.to(bottomLine, speed20ms, {
			width: 0,
			x: 13,
			rotation: 0
		}, '-=' + speed20ms)
		.to(middleLine, speed20ms, {
			width: 32,
			height: 3,
			x: 0,
			y: 0,
			borderRadius: 0,
			ease: Sine.easeInOut
		}, '-=0.05')
		.to(topLine, speed20ms, {
			width: 32,
			x: 0,
			y: 0,
			backgroundColor: '#464646',
			ease: Sine.easeInOut
		}, '-=0.1')
		.to(bottomLine, speed20ms, {
			width: 22,
			x: 0,
			y: 0,
			backgroundColor: '#464646',
			ease: Sine.easeInOut,
			onComplete: function() {
				checking = true,
				animating = false;
			}
		}, '-=' + speed20ms);

	$(document).click(function (e) {
    //check if the clicked area is .menu-wrapper or not
    if (menuWrapper.hasClass('opened') && !animating) {
    	menuWrapper.removeClass('opened');
			tlClick.pause();
			tlClickClose.play(0);
		}
	});

	$('.menu-btn').hover(function() {
		/* Stuff to do when the mouse enters the element */
		if (!menuWrapper.hasClass('opened') && !animating) {
			tlMouseEnter.play(0);
		}
		if (!animating) {
			checking = false;
		}
	}, function() {
		/* Stuff to do when the mouse leaves the element */
		if (!menuWrapper.hasClass('opened') && !checking && !animating) {
			tlMouseEnter.reverse();
		}
		if (!animating) {
			checking = false;
		}
	});

	$('.menu-btn').click(function(event) {
		/* Act on the event */
		event.stopPropagation();
		if (!animating) {
			menuWrapper.toggleClass('opened');
			if (menuWrapper.hasClass('opened')) {
				tlClickClose.pause();
				tlClick.play(0);
			} else {
				tlClick.pause();
				tlClickClose.play(0);
			}
		}
	});

	function stopanimations() {
		// tlMouseEnter.pause();
		// tlClick.pause();
		// tlClickClose.pause();
	}

	/* Add Magic Line markup via JavaScript, because it ain't gonna work without */
  /* Cache it */
  var _magicLine = $("#magic-line");
  
  _magicLine
    // .css("right", '-180px')
    .attr("data-origLeft", "100%")
    .attr("data-origWidth", '180px');
      
  navList.find(".list-item a").hover(function() {
    var $el = $(this);
    leftPos = $el.position().left;
    newWidth = $el.parent().width();
      
    _magicLine.stop().css({
    	left: leftPos + newWidth/2-19,
    	width: 38
    });
  }, function() {
    _magicLine.stop().css({
    	left: _magicLine.attr("data-origLeft"),
    	width: _magicLine.attr("data-origWidth")
    });
  });
});