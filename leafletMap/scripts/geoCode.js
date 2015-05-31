	function geocode( url ) {
		var jSon = null;
		$.getJSON( url , function( data ) {
			console.log( "success");
			if ( !data.error ) {
				jSon = data[0];
			}
		});
		return jSon;
	}