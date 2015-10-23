var app = angular.module('myApp',[]);
app.controller('standardController', ['scope', function($scope){
	//$scope.surname='martin';
}]);

app.directive('newdirective',[function(){
	
	return	{
		restrict : 'E',
		template: 'hello {{surname}} ',
		link: function link(scope, element, attrs) {
		    function insertText() {
		      element.text('This is new');	
    		}
    	insertText();
			}

}}])