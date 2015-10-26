var app = angular.module('myApp',[]);
app.controller('standardController', ['$rootScope', 'sectionService' ,function($scope, sectionService){
	$scope.chosenModules = {};
	$scope.getCpSum = function(){
		var sum = 0;
		if($scope.chosenModules){
			$scope.chosenModules.forEach(function(module){
				sum += module.creditPoints;
			})
		}
	}
	$scope.test = function(){};
}]);

app.factory('sectionService', ['$rootScope', '$http', function($rootScope, $http){
	var sectionLocation = 'http://localhost:3000/sections.js';
	var moduleLocation = 'http://localhost:3000/modules.js';

	function loadSectionById(id, callback){
		$http.get(sectionLocation).success(function(data){
			if(data.sections){
				data.sections.forEach(function(section){
					if (section.sectionId==id){
						callback(section);
					}
				});
			}
		});
	};
	function loadModuleById(id, callback){
		$http.get(moduleLocation).success(function(data){
			data.modules.forEach(function(module){
				if(module.moduleId==id){
					callback(module);
				}
			});
		});
	}
	return {loadBySectionId: loadSectionById,
			loadByModuleId: loadModuleById
			};
}]);

app.directive('sectionloader',['$compile', 'sectionService', '$http', 
	function($compile, sectionService, $http){
	
	return	{
		restrict : 'E',
		template: '<button ng-click="insertSubsections()">loadSection</button><br>',
		//scope : {sectionId:'@'}, 
		terminal: false,
		link: 
			function(scope, iElement, iAttr){
		    	scope.insertSubsections = function(){	    				    				    	
		    		sectionService.loadBySectionId(iAttr.sectionId, function(data){
						var sectionHtmlLocation = "http://localhost:3000/withcompile/sectionhtml.html";
						var moduleHtmlLocation = "http://localhost:3000/withcompile/modulehtml.html"
						scope.section=data;
						if(data.subsections){
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
						}
						else{
							scope.modules = [];
							data.modules.forEach(function(id){
								sectionService.loadByModuleId(id, function(data){
									scope.modules.push(data);
								})
							});
							$http.get(moduleHtmlLocation).success(function(data){
								iElement.append(data);
								$compile(iElement.contents())(scope);
							});
						}
					});
		    	};
			}	
	}
}]);