function showMap(container, latitude, longitude, markerText){
	var latLng = new google.maps.LatLng(latitude, longitude);
	var containerId = container.attr('id');
	console.log("showing map at " + latLng + " with text " + markerText + " in container " + containerId);
	
	// Set map options
	var mapOptions = {
		center: latLng,
		mapTypeId: google.maps.MapTypeId.HYBRID,
		scrollwheel: false,
		zoom: 11
	};
	
	// map has been declared globally
	map = new google.maps.Map(container[0], mapOptions);
	
	marker = new google.maps.Marker({ 
		position: latLng,
		map: map,
		title: markerText
	});
	
	infoWindow = new google.maps.InfoWindow({
		map: map,
		position: latLng,
		content: markerText
	});
	
	map.setCenter(latLng);
	
	// This is the jQuery UI Map Plugin stuff that we do not really need...
	//'addMarker', { 'position': latLng, 'bounds': true }
//	container.gmap(mapOptions).click(function () {
//		$('#' + containerId).gmap('openInfoWindow', { 'content': markerText }, this);
//    });
	// Refresh the map in order to render it correctly
//	container.gmap('refresh');
}