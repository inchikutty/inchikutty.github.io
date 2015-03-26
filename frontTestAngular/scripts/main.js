var phonecatApp = angular.module('patchApp', []);   
phonecatApp.controller('PatchListCtrl', function ($scope, $http) {
 $http.get('data/patch.json').success(function(data) {
$scope.phones = data;
}); 
$scope.orderProp = 'age';
});