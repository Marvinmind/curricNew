var app = angular.module('myApp',[]);
app.controller('sectionController', function($scope, $http){
	console.log('hey y');
	$http.get("sections.js").success(function(result){
		$scope.sections = result.sections;
	});
	function loadSection(x){
		console.log(x);
		return x.sectionName;
	}
});