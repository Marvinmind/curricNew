var app = angular.module('myApp',[]);
app.controller('standardController', ['scope', function($scope){
	$scope.surname='martin';
}]);

app.factory('sectionService', ['$rootScope', '$http', function($rootScope, $http){
	var sectionLocation = 'http://localhost:3000/sections.js';
	function loadSectionById(id, callback){
		$http.get(sectionLocation).success(function(data){
			data.sections.forEach(function(section){
				if (section.sectionId==id){
					console.log(section);
					callback(section);
				}
			});
		;});
	}
	return {loadBySectionId: loadSectionById};
}]);

app.directive('sectionloader',['$compile', 'sectionService',function($compile, sectionService){
	
	return	{
		restrict : 'E',
		template: '<button>loadSection</button><br>',
		scope : {data:'@'},
		link: function link(scope, element, attrs) {
			element.bind('click', function(){
		    	sectionService.loadBySectionId(0, function(data){
					scope.section=data;
					scope.subsections = [];
					data.subsections.forEach(function(id){
						sectionService.loadBySectionId(id,function(data){
							scope.subsections.push(data);
						});
					});
		    		element.append($compile('<div class="subsection"><ul><li ng-repeat="subsection in subsections">{{subsection.sectionName}}</li><ul></div>')(scope));
		    	});
			});
		}
	}
}]);