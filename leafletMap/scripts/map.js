		var div = $( document ).find('.map-container').attr("id", "map"), address ="", zoom = 6,
		map = L.map( div.attr("id") ,{
			center: [0, 0], 
			zoom:16
		}), type = "transport", inputs = $(".form-inline").find('#lat, #lon'),
		popup = L.popup(), marker = L.marker([ 0 , 0 ]), layerTile;
		tile ( type );
		var tileLayer = L.tileLayer( ""+layerTile+"", {
			attribution: "Map data &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors,"+
				" <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>",
			maxZoom: 25
		}).addTo(map), btnVert = $( '.btn-group-vertical').find('.btn');


		inputs.on( 'input keyup change cut paste', function ( event ) {
			inputsToMapView();
		});
		map.on('click', function( e ){
			onMapClick(e);
		});
		$( 'body #search' ).on( 'keypress', function ( e ) {
			if ( e.which === 13 ) {
				geocoding( $( 'body #search' ).val() );
			}
		} );
		$( 'body #searchButton' ).click( function () {
			geocoding( $( 'body #search' ).val() );
		} );
		btnVert.on('click', function(){
			tile ( $(this).attr("id") );
			setTile();
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
			reverseGeocoding( this.lat.value, this.lon.value);
		}
	}
	function MapViewToinputs( LatLng ) {
		this.lat.value = LatLng.lat; 
		this.lon.value = LatLng.lng;
		reverseGeocoding( this.lat.value, this.lon.value);
		marker.setLatLng(LatLng).addTo(map);
	}
	function setTile( ){
		tileLayer.setUrl( ""+layerTile+"").addTo( map);
	}
	function tile( t ){
		switch( t ){
			case "transport":
			layerTile = "http://b.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png";
			break;
			case "hikebike":
			layerTile = "http://toolserver.org/tiles/hikebike/{z}/{x}/{y}.png";
			break;
			case "sea":
			layerTile = "http://tiles.openseamap.org/seamark/{z}/{x}/{y}.png";
			break;
			case "human":
			layerTile = "http://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
			break;
			case "mapquest":
			layerTile = "http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png";
			break;
			default:
			layerTile = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
			
		}
	}
	function geocoding( address ) {
		var _this = this;
		var array= address.split( /\s*,\s*/ ), data;
		$.each( array, function ( i, a ) {
			if ( a.match( /(^[0-9\s\(\)\[\]\/\.\,\:\;\-]+$)/ ) ) {
				array[i] = null;
			}
		} );
		address = array.join( ',' );
		var url = "http://nominatim.openstreetmap.org/"+"search/" + address + "?format=json&addressdetails=1";
		$.getJSON( url , function( dat ) {
			console.log( "success");
			if ( !dat.error ) {
				data = dat;
			}
		});
		if ( data.length ) {
				var latlng = L.latLng ( data[0].lat, data[0].lon ),
					$list = $('body').find( '#lat, #lon' );
				$list.eq( 0 ).val( latlng.lat.toFixed( 4 ) );
				$list.eq( 1 ).val( latlng.lng.toFixed( 4 ) );
				locationResults( data[0] );
				markMapView( latlng );
			}
			else {
				$( 'body #search' ).val( '' ).attr( 'placeholder', 'Incorrect search query, Search again!!' );
			}
	}
	function reverseGeocoding ( latd, lond ) {
		var url = "http://nominatim.openstreetmap.org/"+"reverse?format=json&lat="+latd+"&lon="+lond+"&addressdetails=1";
		$.getJSON( url, function ( data ) {
			if ( !data.error ) {
				locationResults ( data );
			}

		} );
	}
	function locationResults( data){
		if ( JSON.stringify( data ).length > 0 ) {
					var _this = this,
						address = '',
						city ='',
						state='',
						country ='';
						

				$.each( data.address, function ( i, value ) {
				// generating display address from geocoded/reverse geocoded result-json object.
				if ( !( ( i === 'country' ) || ( i === 'country_code' )|| ( i === 'postcode' ) ||
					( i === 'state_district' ) || ( i === 'county' ) ) && value
				) {
					if ( $('body #search').value !== value ) {
						address += value + ',';
						country = value;
						value = false;
					}
				}
				else if ( ( i === 'country' ) && value ) {
					address += value;
					country = value;
					value = false;
				}
				else {
					value = false;
				}

				//Setting zoom level according to 'importance' element; nominatim describes 'importance'as
				//Indicator of how important a place is. Values in the range 0 to 1 where 1 is most important.
				//The major weight of importance comes indeed from the Wikipedia link count.
				//Incase of a detailed location search importnce value will be more than 1.
				if ( data.importance ) {
					if ( data.importance <= 0.5 ) {// most probably small places, not famous ones
						zoom = 14;
					}
					else if ( data.importance <= 0.6 ) {// most probably a city|town
						zoom = 13;
					}
					else if ( data.importance <= 0.7 ) {// most probably a city|town
						zoom = 12;
					}
					else if ( data.importance <= 0.8 ) {// most probably a district|state|country
						zoom = 11;
					}
					else if ( data.importance <= 0.9 ) {// most probably a district|state|country
						zoom = 7;
					}
					else if ( data.importance <= 1 ) {//most probably an entire country|continent or an extremely famous place
						if ( data.type === 'administrative' ) {//If its a country|continent
							zoom = 5;
						}
						else {
							zoom = 8;
						}
						$.each( data, function ( i, value ) {
							if ( i === 'display_name' ) {
								address = value;
							}
						} );
					}
					else if ( data.importance <= 1.5 ) {// most probably a multiple word search|detailed address search
						zoom = 11;
					}
					else if ( data.importance <= 2 ) {// most probably a multiple word search|full address search
						zoom = 13;
					}
				}

				//For a single-word-location search, setting zoom level based on 'importance' could be sufficient( Provided user enters
				// exact name of place which is having most number of links in Wikipedia ) but in case of detailed address search or
				//multiple word search one may have to check additional elements, one such element is 'type'.
				//'type' as its name suggests describes type of location|place. There are plenty of 'types' defined|approved by nominatim
				//most relevant for our purpose is 'primary' and 'secondary' as they define full address or detailed address searches.
				//for more info on 'type' refer --->[ http://taginfo.openstreetmap.org/ ]
				if ( data.type ) {
					if ( data.type === 'attraction' ) {//An extremely famous place like a monument, tourist spot etc.
						zoom = 15;
						$.each( data, function ( i, value ) {
							if ( i === 'display_name' ) {
								address = value;
							}
						} );
					}
					else if ( ( data.type === 'bus_stop' ) || ( data.type === 'restaurant' ) ||
						( data.type === 'road' ) || ( data.type === 'hamlet' ) || ( data.type === 'house' ) ||
						( data.type === 'primary' ) || ( data.type === 'secondary' )
					) {
						zoom = 15;
					}
					else if ( ( data.type === 'village') || ( data.type === 'street' ) ||
						( data.type === 'standard_street' ) || ( data.type === 'small_place' ) ||
						( data.type === 'residential' )
					) {
						zoom = 13;
					}
					else if ( ( data.type === 'town' )|| ( data.type === 'standard_place' ) ) {
						zoom = 12;
					}
					else if ( ( data.type === 'city' ) || ( data.type === 'state' ) ) {
						zoom = 11;
					}
					else if ( data.type === 'country' ) {
						zoom = 7;
					}
					else if ( data.type === 'administrative' ) {
					//An administrative place like capital city|state|country etc, hence double check its 'importance' and set the value.
						if ( data.importance ) {
							if ( ( data.importance >= 1 ) && ( data.importance <= 1.5 ) ) {
								zoom = 9 ;
							}
							else if ( ( data.importance >= 1.5 ) && ( data.importance <= 2 ) ) {
								zoom = 8 ;
							}
							else if ( ( data.importance >= 2 ) && ( data.importance <= 2.5 ) ) {
								zoom = 7 ;
							}
							else if ( data.importance >= 2.5 ) {
								zoom = 6 ;
							}
						}
						$.each( data, function ( i, value ) {
							if ( i === 'display_name' ) {
								address = value;
							}
						} );
					}
				}
			} );

			}

			if ( map ) {
				map.on( 'zoomend', function () {
					zoom = map.getZoom();
				} );
			}
			$( 'body #search' ).attr( 'placeholder', 'Search a place' );
			$( 'body #address' ).text( address);
		
	}