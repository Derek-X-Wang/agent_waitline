var agCtrls = angular.module('agCtrls', [
  'ui.scroll', 'ui.scroll.jqlite'
]);

agCtrls.controller('mainCtrl', ['$scope', '$rootScope', '$timeout', 'availableAgents',
    function($scope, $rootScope, $timeout, availableAgents) {
      $scope.toggleAvailability = function(){
        console.log("toggle ava test");
        $rootScope.available = !$rootScope.available;
      };
      $scope.agentList = [];

      $scope.showDetailDialog = function(agent){
        console.log("click detail dialog");
      };
      $scope.datasource = availableAgents.query(function(result) {
        //console.log(result);
        result.forEach(function(item,index,arr){
          console.log("index", index, "item:", item);
          $scope.agentList.push(item);
        });
      });
      console.log("here2");
      //$scope.datasource = {"aaa":"ddd", "bbb":"eee","ccc":"fff"};
      // var datasource = {};
      // datasource.get = function (index, count, success) {
			// 	$timeout(function () {
			// 		var result = [];
			// 		for (var i = index; i <= index + count - 1; i++) {
			// 			result.push("item #" + i);
			// 		}
			// 		success(result);
			// 	}, 100);
			// };
      //
			// $scope.datasource = {};
    }
]);

agCtrls.controller('authCtrl', ['$scope', '$http', '$rootScope', '$location',
    function($scope, $http, $rootScope, $location) {
      $scope.user = {email: '', password: '', name:'', phone:'', description:'', available:true};
      $scope.error_message = '';

      $scope.login = function(){
        $http.post('/auth/login', $scope.user).success(function(data){
          if(data.state == 'success'){
            $rootScope.authenticated = true;
            $rootScope.current_user = data.user.email;
            $rootScope.available = data.user.available;
            $location.path('/');
          }
          else{
            $scope.error_message = data.message;
          }
        });
      };

      $scope.register = function(){
        console.log("user is ", $scope.user.email);
        $http.post('/auth/signup', $scope.user).success(function(data){
          if(data.state == 'success'){
            $rootScope.authenticated = true;
            $rootScope.current_user = data.user.email;
            $rootScope.available = data.user.available;
            $location.path('/');
          }
          else{
            console.log(data);
            $scope.error_message = data.message;
          }
        }).error(function (data, status, headers, config) {
                console.log("err", status);
            });
      };
    }
]);
