var agApp = angular.module('agApp', [
    'ngRoute', 'agCtrls', 'agDirectives'
]).run(function($rootScope) {
	$rootScope.authenticated = false;
	$rootScope.current_user = '';

	$rootScope.signout = function(){
    	$http.get('auth/signout');
    	$rootScope.authenticated = false;
    	$rootScope.current_user = '';
	};
});

agApp.config(function($routeProvider) {
    $routeProvider.when('/main', {
        templateUrl: 'template/main.html',
        controller: 'mainCtrl'
    }).when('/login', {
        templateUrl: 'template/login.html',
        controller: 'authCtrl'
    }).when('/register', {
        templateUrl: 'template/register.html',
        controller: 'mainCtrl'
    }).otherwise({
        redirectTo: '/main'
    });
});
