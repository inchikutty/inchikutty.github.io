		var div = $( document ).find('.map-container');
		div.attr("id", "map");
		var map = L.map( div.attr("id") ,{
			center: [0, 0], 
			zoom:16
		});
		var inputs = $(".form-inline").find('#lat, #lon');
		var popup = L.popup();
		var marker = L.marker([ 0 , 0 ]);
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
			maxZoom: 25
		}).addTo(map);
		inputs.on( 'input', function ( event ) {
			inputsToMapView();
		});
	map.on('click', function( e ){
		onMapClick(e);
	});
	function onMapClick(e) {
		MapViewToinputs( e.latlng );
	}
	function validCoord( latd , lond ) {
		if( latd && lond ){
			if( ( ( latd <= 90 ) && ( latd >= -90) ) && ( ( lond <= 180 ) && ( latd >= -180) ) ){
				return 1;
			}
			else{
				return 0;
			}
		}
		else {
			return 0; 
		}
	}
	function inputsToMapView() {
		var chk = validCoord ( this.lat.value , this.lon.value);
		if(chk) {
			var latlng = L.latLng ( this.lat.value , this.lon.value );
			map.panTo( latlng );
			marker.setLatLng(latlng).addTo(map);
		}
	}
	function MapViewToinputs( LatLng ) {
		this.lat.value = LatLng.lat; 
		this.lon.value = LatLng.lng;
		marker.setLatLng(LatLng).addTo(map);
	}