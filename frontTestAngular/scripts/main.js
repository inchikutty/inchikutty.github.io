var app = angular.module('patchApp', []);
app.controller('patchCtrl', function ($scope, $http) {
	$scope.patches = [];
	$http.get('data/patch.json').success(function(data) {
		$scope.patches = data;
	});
	$scope.state= 'pending';
	$scope.metric = function( id ){
		/*switch( id ){
			case: 
			break;
		}*/
		return '60';
	}
	$scope.build = function( id ){
		/*switch( id ){
			case: 
			break;
		}*/
	}
	$scope.unit = function( id ){
		/*switch( id ){
			case: 
			break;
		}*/
	}
	$scope.func = function( id ){
		/*switch( id ){
			case: 
			break;
		}*/
	}
	$scope.outcome = function( id){
		/*switch( id ){
			case: 
			break;
		}*/
	}
});
/*
app.directive('patchUpdate', ['$parse', function($parse) {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            parsed = $parse(attrs.find);
            if($(element).find( 'id')==scope.patches.id){
				$(element).find('#state').on({
				
				})
             
            }
        }
    }
}]);*/

