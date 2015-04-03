	var div = $("<input type='text' id='lat'/><input type='text' id='lon'/>");
	$('body #map').append( div);
	var inputs = div.find('#lat, #lon');
	var LatLng = L.latLng ( 100 , 45 );
	div.on('click', function( e ){
		e.latlng = LatLng;
	});
	var e = div.trigger('click');
	$('body #map').hide();
	/*
	QUnit.module( "myMap", {
		beforeEach: function() {
			var div = $("<input type='text' id='lat'/><input type='text' id='lon'/>");
			$('body #map').append( div);
			var inputs = div.find('#lat, #lon');
			var LatLng = L.latLng ( 100 , 45 );
			div.on('click', function( e ){
				e.latlng = LatLng;
			});
			var e = div.trigger('click');
		},
		afterEach: function() {
		// clean up after each test
			$('body #map').hide();
		}
	});*/
	/*QUnit.test( "click on map event", function( assert ) {
		assert.ok( onMapClick(e), "Passed!" );
	});*/
	QUnit.test("valid coordinates", function( assert ) {
		assert.equal( validCoord( 90, 105), 1 );
		assert.equal( validCoord( 95, 185), 0);
	});