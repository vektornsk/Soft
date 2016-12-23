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

}); //end jquery
