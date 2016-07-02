var agCtrls = angular.module('agCtrls', [
  'ui.scroll', 'ui.scroll.jqlite', 'ngDialog'
]);

agCtrls.controller('mainCtrl', ['$scope', '$rootScope', '$timeout', 'availableAgents', 'ngDialog',
    function($scope, $rootScope, $timeout, availableAgents, ngDialog) {
      $scope.agentList = [];
      availableAgents.query(function(result) {
        //console.log(result);
        result.forEach(function(item,index,arr){
          //console.log("index", index, "item:", item);
          $scope.agentList.push(item);
        });
      });

      $scope.toggleAvailability = function(){
        console.log("toggle ava test");
        $rootScope.available = !$rootScope.available;
        // save to db
        $scope.agent = new availableAgents();
        $scope.agent.email = $rootScope.current_user.email;
        $scope.agent.available = $rootScope.available;
        availableAgents.save($scope.agent, function(){
          console.log("availability updated in db");
        });
        if ($rootScope.available) {
          $scope.agentList.push($rootScope.current_user);
        } else {
          var i;
          $scope.agentList.forEach(function(item,index,arr){
            if (item.email === $rootScope.current_user.email) {
              i = index;
            }
          });
          $scope.agentList.splice(i,1);
        }
      };

      $scope.showDetailDialog = function(agent){
        console.log("click detail dialog");
        //console.log("agent:",agent);
        $scope.agent = agent;
        ngDialog.open({ template: 'template/agent-detail-popup.html',
                        className: 'ngdialog-theme-default ngdialog-theme-custom',
                        scope: $scope
                      });
      };

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
            $rootScope.current_user = data.user;
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
            $rootScope.current_user = data.user;
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
