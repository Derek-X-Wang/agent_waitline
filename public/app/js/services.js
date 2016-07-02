var agServices = angular.module('agServices', []);

  agServices.factory('availableAgents', ['$resource',
		function ($resource) {
			return $resource('/api/users/:email', { email: '@email' }, {
        update: {
          method: 'PUT' // this method issues a PUT request
        }
      });
		}
	]);
