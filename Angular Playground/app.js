var app = angular.module('myApp',[]);
app.controller('standardController', ['scope', function($scope){
	//$scope.surname='martin';
}]);

app.directive('newdirective',['$compile',function($compile){
	
	return	{
		restrict : 'E',
		template: 'hello {{surname}} ',
		link: function link(scope, element, attrs) {
		    function insertText() {
		      angular.element(document.getElementById('hello')).append($compile('<input ng-model="myinput"></input><br><p>{{myinput}}</p>')(scope));
			}
		    	insertText();


}}}]);