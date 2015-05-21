(function(){

	'use strict';

	/** @function RegisterController
	 * @desc Registration View Controller, handles the logic of registration form 
	 * @param {module} $scope - registration Data-Model
 	 * @param {service} SugarServices - {@link GHPP.SugarServices}
 	 * @memberOf GHPP
 	 */

	angular
		.module('GHPP')
		.controller('RegisterController', RegisterController);
	
	RegisterController.$inject = ['$scope', 'SugarServices'];

	function RegisterController($scope, SugarServices) {
		
		$scope.provider = {
			organizationName: null,
			firstName: null,
			lastName: null,
			email: null,
			password: null,
			passwordConfirmation: null
		};

		$scope.onRegistration = function(isValid) {
			SugarServices.registerProvider($scope.provider);
		};
	}

}());




