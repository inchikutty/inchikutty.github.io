angular.module('fiskkitTestProject', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']);

angular.module('fiskkitTestProject').config(function($stateProvider, $urlRouterProvider) {

    /* Add New States Above */
    $urlRouterProvider.otherwise('/home');

});

angular.module('fiskkitTestProject').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };
	$rootScope.status = false;
    $rootScope.toggle = function() {
        $rootScope.status = !$rootScope.status;
    };

});
