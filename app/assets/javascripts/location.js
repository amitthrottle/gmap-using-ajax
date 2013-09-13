
//old code
/*jQuery(document).ready(function() {

	// Load google map
	var map = new google.maps.Map( document.getElementById("gmap"),  {
		center: new google.maps.LatLng(0,0),
		zoom: 3,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		panControl: false,
		streetViewControl: false,
		mapTypeControl: false
	});


	jQuery('input[name=search]').click(function() {

		var geocoder = new google.maps.Geocoder(); 
		geocoder.geocode({
				address : jQuery('input[name=address]').val(), 
				region: 'no' 
			},
		    function(results, status) {
		    	if (status.toLowerCase() == 'ok') { // Get center
					
					var coords = new google.maps.LatLng(
						results[0]['geometry']['location'].lat(),
						results[0]['geometry']['location'].lng()
					);
					jQuery('#coords').html('Latitute: ' + coords.lat() + '    Longitude: ' + coords.lng() );
					
					map.setCenter(coords);
					map.setZoom(18);
					
					 
					marker = new google.maps.Marker({ // Set marker
						position: coords, 
						map: map, 
						title: jQuery('input[name=address]').val(),
					});
							    	
		    	}
			}
		);
	});
	
});
*/
//above code works perfectly,either of the code can be used

    var map = null;
    var geocoder = null;

    function initialize() {
      if (GBrowserIsCompatible()) {
        map = new GMap2(document.getElementById("map_canvas"));
        map.setCenter(new GLatLng(19.218331, 72.97809),3);
        map.setUIToDefault();
        geocoder = new GClientGeocoder();
      }
    }

    function showAddress(address) 
	{
      if (geocoder)
	  {
        geocoder.getLatLng(
          address,
          function(point)
		  {
            if (!point)
			{
              alert(address + " location not found");
            }
			else
			{
              map.setCenter(point, 15);
              var marker = new GMarker(point, {draggable: true});
              map.addOverlay(marker);
              GEvent.addListener(marker, "dragend", function() {
                marker.openInfoWindowHtml(marker.getLatLng().toUrlValue(6));
              });
              GEvent.addListener(marker, "click", function() {
                marker.openInfoWindowHtml(marker.getLatLng().toUrlValue(6));
              });
	      GEvent.trigger(marker, "click");
            }
          }
        );
      }
    }
   
   
  