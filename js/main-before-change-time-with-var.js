$(document).ready(function () {
	var tlMouseEnter = new TimelineMax({paused: true}),
			tlClick = new TimelineMax({paused: true}),
			tlClickClose = new TimelineMax({paused: true}),
			topLine = $('.top-line'),
			middleLine = $('.middle-line'),
			bottomLine = $('.bottom-line'),
			menuLine = $('.menu-line'),
			test = false,
			animating = false;


	var menuWrapper = $('.menu-wrapper'),
			navList = $('.nav-list');

	$(document).click(function (e) {
    //check if the clicked area is .menu-wrapper or not
    if (menuWrapper.hasClass('opened') && !animating) {
    	menuWrapper.removeClass('opened');
			tlClick.pause();
			tlClickClose.play(0);
		}
	});

	tlMouseEnter
		.to(menuLine, 0.15, {
			width: '6px',
			height: '6px',
			borderRadius: '50%',
			ease: Sine.easeInOut
		})
		.to(topLine, 0.15, {
			x: 24,
			y: 6
		}, '-=0.15')
		.to(middleLine, 0.15, {
			x: 12,
			y: 0
		}, '-=0.15')
		.to(bottomLine, 0.15, {
			x: 0,
			y: -6
		}, '-=0.15');

	tlClick
		.to(topLine, 0.2, {
			x: 12,
			onStart: function() {
				test = true,
				animating = true;
			}
		})
		.to(bottomLine, 0.2, {
			x: 12
		}, '-=0.2')
		.to(middleLine, 0.1, {
			x: -6, 
			y: -18, 
			width: 40, 
			height: 40, 
			borderRadius: '50%',
			ease: Sine.easeInOut
		}, '+=0.10')
		.to(topLine, 0.2, {
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
		.to(bottomLine, 0.2, {
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
		}, '-=0.2');

	tlClickClose
		.to(topLine, 0.2, {
			width: 0,
			x: 13,
			rotation: 0,
			onStart: function() {
				animating = true;
			}
		})
		.to(bottomLine, 0.2, {
			width: 0,
			x: 13,
			rotation: 0
		}, '-=0.2')
		.to(middleLine, 0.2, {
			width: 32,
			height: 3,
			x: 0,
			y: 0,
			borderRadius: 0,
			ease: Sine.easeInOut
		}, '-=0.05')
		.to(topLine, 0.2, {
			width: 32,
			x: 0,
			y: 0,
			backgroundColor: '#464646',
			ease: Sine.easeInOut
		}, '-=0.1')
		.to(bottomLine, 0.2, {
			width: 22,
			x: 0,
			y: 0,
			backgroundColor: '#464646',
			ease: Sine.easeInOut,
			onComplete: function() {
				test = true,
				animating = false;
			}
		}, '-=0.2');

	$('.menu-btn').hover(function() {
		/* Stuff to do when the mouse enters the element */
		if (!menuWrapper.hasClass('opened') && !animating) {
			tlMouseEnter.play(0);
		}
		if (!animating) {
			test = false;
		}
	}, function() {
		/* Stuff to do when the mouse leaves the element */
		if (!menuWrapper.hasClass('opened') && !test && !animating) {
			tlMouseEnter.reverse();
		}
		if (!animating) {
			test = false;
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
  navList.append("<span id='magic-line'></span>");
    
  /* Cache it */
  var $magicLine = $("#magic-line");
  
  $magicLine
    .width('180px')
    .css("right", '-180px')
    .data("origLeft", $magicLine.position().left)
    .data("origWidth", $magicLine.width());
      
  navList.find(".list-item a").hover(function() {
    $el = $(this);
    leftPos = $el.position().left;
    newWidth = $el.parent().width();
      
    $magicLine.stop().animate({
      left: leftPos + newWidth/2-19,
      width: '38px'
    });
  }, function() {
    $magicLine.stop().animate({
      left: $magicLine.data("origLeft"),
      width: $magicLine.data("origWidth")
    });    
  });
});