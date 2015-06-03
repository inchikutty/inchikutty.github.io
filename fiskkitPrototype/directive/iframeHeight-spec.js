describe('iframeHeight', function() {

  var scope,compile;

  beforeEach(module('fiskkitTestProject'));

  beforeEach(inject(function($rootScope,$compile) {
    scope = $rootScope.$new();
    compile = $compile;
  }));
  
   it('Should set iframe height to its parents height', function() {
		var elm = angular.element( '<iframe iframe-height src="foo " style="height: 100px"></iframe>' );
		var htm = compile( elm )(scope);
		elm.trigger('click');
		
		scope.$digest();

		expect( elm[0].style.height ).toBe('300px');
	});

});