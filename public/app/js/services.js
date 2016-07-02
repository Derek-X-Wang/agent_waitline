var agServices = angular.module('agServices', ['ui.scroll', 'ui.scroll.jqlite']);

agServices.factory('agentList', ['$timeout',
	function ($timeout) {
		// var get = function (index, count, success) {
		// 	$timeout(function () {
    //
		// 		var result = ["aaa","bbb","ccc","ddd"];
		// 		// for (var i = index; i <= index + count - 1; i++) {
		// 		// 	result.push("item #.!.." + i);
		// 		// }
		// 		success(result);
		// 	}, 100);
		// };

    // var users = $resource('/api/users/:email').query(function() {
    //    console.log(entries);
    // });
    var get = function (index, count, success) {
      var result = ["aaa","bbb","ccc","ddd"];
  		// for (var i = index; i <= index + count - 1; i++) {
			// 	result.push("item #.!.." + i);
			// }

			success(result);
		};

		return {
			get: get
		};
	}
]);

  agServices.factory('availableAgents', ['$resource',
		function ($resource) {
			return $resource('/api/users/:email');
		}
	]);
