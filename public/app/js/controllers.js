var agCtrls = angular.module('agCtrls', [
  'ui.scroll', 'ui.scroll.jqlite'
]);

agCtrls.controller('mainCtrl', ['$scope', '$timeout',
    function($scope, $timeout ) {
      var datasource = {};
      datasource.get = function (index, count, success) {
				$timeout(function () {
					var result = [];
					for (var i = index; i <= index + count - 1; i++) {
						result.push("item #" + i);
					}
					success(result);
				}, 100);
			};

			$scope.datasource = datasource;
    }
]);

agCtrls.controller('authCtrl', ['$scope', '$http', '$rootScope', '$location',
    function($scope, $http, $rootScope, $location) {
      $scope.user = {email: '', password: '', name:'', phone:'', description:''};
      $scope.error_message = '';

      $scope.login = function(){
        $http.post('/auth/login', $scope.user).success(function(data){
          if(data.state == 'success'){
            $rootScope.authenticated = true;
            $rootScope.current_user = data.user.username;
            $location.path('/');
          }
          else{
            $scope.error_message = data.message;
          }
        });
      };

      $scope.register = function(){
        console.log("start to register");
        console.log("user is ", $scope.user.email);
        $http.post('/auth/signup', $scope.user).success(function(data){
          if(data.state == 'success'){
            console.log("start to register1");
            $rootScope.authenticated = true;
            $rootScope.current_user = data.user.username;
            $location.path('/');
          }
          else{
            console.log("start to register2");
            console.log(data);
            $scope.error_message = data.message;
          }
        }).error(function (data, status, headers, config) {
                console.log("err", status);
            });
      };
    }
]);
