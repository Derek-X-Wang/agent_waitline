var agApp = angular.module('agApp', [
    'ngRoute', 'ngResource', 'agCtrls', 'agDirectives'
]).run(['$rootScope', '$http',function($rootScope, $http) {
	$rootScope.authenticated = false;
	$rootScope.current_user = '';

	$rootScope.signout = function(){
      console.log("signout");
    	$http.get('/auth/signout');
    	$rootScope.authenticated = false;
    	$rootScope.current_user = '';
	};
}]);

agApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'template/main.html',
        controller: 'mainCtrl'
    }).when('/login', {
        templateUrl: 'template/login.html',
        controller: 'authCtrl'
    });
});
