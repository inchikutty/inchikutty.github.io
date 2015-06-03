describe('trustAsResourceUrl', function() {

	beforeEach(module('fiskkitTestProject'));

	it('should be able to filter the input URL using $sce service', inject(function( $filter, $sce ) {

       var filter = $filter('trustAsResourceUrl')('http://fiskkit.com');

		expect( filter.$$unwrapTrustedValue() ).toBe('http://fiskkit.com');

	}));

});