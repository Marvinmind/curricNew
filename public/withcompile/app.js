var app = angular.module('myApp',[]);
app.controller('standardController', ['$rootScope', 'sectionService' ,function($scope, sectionService){
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
		});
	}
	return {loadBySectionId: loadSectionById};
}]);

app.directive('sectionloader',['$compile', 'sectionService', '$http', 
	function($compile, sectionService, $http){
	
	return	{
		restrict : 'E',
		template: '<button ng-click="insertSubsections()">loadSection</button><br>',
		scope : {sectionId:'@'}, 
		terminal: false,
		compile: function (element, attrs) {
			return function(scope, iElement, iAttr){
		    	scope.insertSubsections = function(){
		    				    				    		console.log(iAttr)

		    				    		console.log(iAttr.sectionId)

		    		sectionService.loadBySectionId(iAttr.sectionId, 
		    			function(data){
		    				console.log(data);

				    		var sectionHtmlLocation = "http://localhost:3000/withcompile/sectionhtml.html"
							scope.section=data;
							scope.subsections = [];
							data.subsections.forEach(function(id){
								sectionService.loadBySectionId(id,function(data){
									scope.subsections.push(data);
								});
							});
							$http.get(sectionHtmlLocation).success(function(data){
					    		iElement.append(data);
					  			$compile(iElement.contents())(scope);
				  			});
		    			});
		    	};
			};
		}
	}
}]);
/*
app.directive('playground', [function($scope){
	return{
		restrict: 'E',
		template: '
					<div class="sectioncontainer">
						<h2>{{sectionName}}</h2><br>
						subsection:<br>
						<ul>
							<li ng-repeat="section in {{subsections}}"><playground></li>'


	}
}]);*/