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
        mapTypeId: "roadmap"
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
		// to down
    $(window).scroll(function() {
        if($(this).scrollTop() >= 290) {
            $('header').addClass('fix');
        }
        else{
            $('header').removeClass('fix');
        }
    });
		// to up
	// var didScroll;
	// var lastScrollTop = 0;
	// var delta = 5;
	// var navbarHeight = $('header').outerHeight();
	//
	// $(window).scroll(function(event){
	//     didScroll = true;
	// });
	//
	// setInterval(function() {
	//     if (didScroll) {
	//         hasScrolled();
	//         didScroll = false;
	//     }
	// }, 250);
	//
	// function hasScrolled() {
	//     var st = $(this).scrollTop();
	//
	//     // Make sure they scroll more than delta
	//     if(Math.abs(lastScrollTop - st) <= delta)
	//         return;
	//
	//     // If they scrolled down and are past the navbar, add class .nav-up.
	//     // This is necessary so you never see what is "behind" the navbar.
	//     if (st > lastScrollTop && st > navbarHeight){
	//         // Scroll Down
	//         $('header').removeClass('nav-down').addClass('nav-up');
	//     } else {
	//         // Scroll Up
	//         if(st + $(window).height() < $(document).height()) {
	//             $('header').removeClass('nav-up').addClass('nav-down');
	//         }
	//     }
	//
	//     lastScrollTop = st;
	// }

	// Cache selectors
		var lastId,
    topMenu = $(".menu"),
    topMenuHeight = topMenu.outerHeight()+70,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({
      scrollTop: offsetTop
  }, 300, 'swing');
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;

   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";

   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href='#"+id+"']").parent().addClass("active");
   }
});
	// scroll

	// $('.menu__link').click( function(){
	// 	var scroll_el = $(this).attr('href');
	//   	if ($(scroll_el).length !== 0) {
	// 	    $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
	//     }
	// 	    return false;
	// });
	$('.arrow-down').click( function(){
		var scroll_el = $(this).attr('href');
	  	if ($(scroll_el).length !== 0) {
		    $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
	    }
		    return false;
	});




}); //end jquery
