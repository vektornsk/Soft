$(function() {

	// slick-carousel
	$('.js-carousel').slick({
		infinite: true,
		draggable: false,
		prevArrow: $('.carousel-arrow__left'),
		nextArrow: $('.carousel-arrow__right')
	});

	// map
	function GoogleMap() {
    var infowindow, map = new google.maps.Map(document.getElementById("map"), {
      center: {lat: 55.04857464785344, lng: 82.91158676147461},
      zoom: 17,
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: true,
      mapTypeId: "roadmap",
			scrollwheel: false
    });
    infowindow = new google.maps.InfoWindow();
    (new google.maps.Marker({
      position: {lat: 55.04857464785344, lng: 82.91158676147461},
      map: map,
			icon: '../images/SVG/Map_pin.svg',
      title: decodeURIComponent("%D0%A2%D0%BE%D1%87%D0%BA%D0%B01")
    }))
    .addListener('click', function (e) {
      infowindow.setContent(decodeURIComponent("%D0%A2%D0%BE%D1%87%D0%BA%D0%B0"));
      infowindow.open(map, this);
    });
    return map;
	}
	GoogleMap();

	// header-fix
  $(window).scroll(function() {
    if($(this).scrollTop() >= 90) {
      $('header').addClass('fix');
    }
    else{
      $('header').removeClass('fix');
    }
  });

	// Cache selectors
	var lastId,
  topMenu = $(".menu"),
  topMenuHeight = topMenu.outerHeight()+1,
  menuItems = topMenu.find("a"),
  scrollItems = menuItems.map(function(){
    var item = $($(this).attr("href"));
    if (item.length) { return item; }
  });

	menuItems.click(function(e){
	  var href = $(this).attr("href"),
	    offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
	  $('html, body').stop().animate({
	    scrollTop: offsetTop
	  }, 700, 'swing');
	  e.preventDefault();
	});

	// Bind to scroll
	$(window).scroll(function(){
	   var fromTop = $(this).scrollTop()+topMenuHeight;
	   var cur = scrollItems.map(function(){
	     if ($(this).offset().top < fromTop)
	       return this;
	   });
	   cur = cur[cur.length-1];
	   var id = cur && cur.length ? cur[0].id : "";

	   if (lastId !== id) {
	     lastId = id;
	     menuItems
	       .parent().removeClass("active")
	       .end().filter("[href='#"+id+"']").parent().addClass("active");
	   }
	});

	// scroll arrow
	$('.arrow-down').click( function(){
		var scroll_el = $(this).attr('href');
  	if ($(scroll_el).length !== 0) {
	    $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 300, 'swing');
    }
		return false;
	});

	// button-menu
	$('.menu-burger').on('click', function(){
		$(this).closest('nav').find('.menu-list').animate({right:'0'}, 300, 'swing').addClass('open');
		$('body').css({overflowY: 'hidden'});
	});

	// menu-close
	$('.menu-button').on('click', function(){
		var menuSize = $(this).closest('nav').find('.menu-list').outerWidth();
		$(this).closest('nav').find('.menu-list').animate({right: '-' + menuSize}, 300, 'swing', function(){
			$(this).removeClass('open');
		});
		$('body').css({overflowY: 'auto'});
	});

$('.menu__link').on('click', function(){
	var menuSize = $(this).closest('nav').find('.menu-list').outerWidth();
	$(this).closest('nav').find('.menu-list').animate({right: '-' + menuSize}, 300, 'swing', function(){
		$(this).removeClass('open');
	});
	$('body').css({overflowY: 'auto'});
});






}); //end jquery
