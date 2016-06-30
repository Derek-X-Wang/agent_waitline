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

    }
]);
