angular.module('fiskkitTestProject').directive('iframeHeight', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, fn) {
			var ifr = element[0];
			element.on('click load', function(){
               var iFrameHeight = ( parent.window.innerHeight| parent.document.body.clientHeight | 300 ) + 'px';
               ifr.style.height = iFrameHeight;
			});
		}
	};
});