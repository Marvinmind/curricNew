var app = angular.module('myApp',[]);
app.controller('sectionController', function($scope){
	$http('~/nodejs/curriculum/sections.js').success(function(result){
		$scope.sections = result;
	});
})