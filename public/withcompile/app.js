var app = angular.module('myApp',[]);
app.controller('standardController', ['scope', function($scope){
	//$scope.surname='martin';
}]);

app.factory('sectionService', ['$rootScope', '$http', function($rootScope, $http){
	var sectionLocation = 'http://localhost:3000/sections.js';
	function loadSectionById(id, callback){
		$http.get(sectionLocation).success(function(data){console.log(data);});
	}
	return {loadBySectionId: loadSectionById};
}]);

app.directive('sectionloader',['$compile', 'sectionService',function($compile, sectionService){
	
	return	{
		restrict : 'E',
		template: '<button>loadSection</button><br>',
		scope : {},
		link: function link(scope, element, attrs) {
			element.bind('click', function(){
		    	sectionService.loadBySectionId(0, function(data){
		    		element.append($compile('<input ng-model="myinput"></input><br><p>{{myinput}}</p>')(scope));
		    	});
			});
		    //insertText();
		}
	}
}]);