var app = angular.module('myApp',[]);
app.controller('sectionController', ['$scope','$sce','$http', function($scope, $sce, $http){
	console.log('hey y');
	$http.get("sections.js").success(function(result){
		$scope.sections = result.sections;
	});
	$scope.loadSection = function(x){
		return $sce.trustAsHtml(x.sectionName+" <button ng-click='stuff()'>stuff</button>");
	}
	$scope.loadChildren = function(subsections){
		console.log(subsections);
	}
	$scope.stuff = function(){console.log('hey')};
}]);

app.directive('addChildren', []function($compile){
	return {
		restrict: 'E',
		scope: {
			id: '@addChildren'
		}
	}
})