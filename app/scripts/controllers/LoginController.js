(function(){

	'use strict';

	/** @function LoginController
	 * @desc Login View Controller, handles the logic of login form 
	 * @param {module} $scope - login Data-Model
 	 * @param {service} SugarServices - {@link GHPP.SugarServices}
 	 * @param {service} publicizeToaster - {@link publicizeToaster}
 	 * @memberOf GHPP
 	 */

	angular
		.module('GHPP')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$scope', 'SugarServices','publicizeToaster', 'toaster'];

	function LoginController($scope, SugarServices, publicizeToaster, toaster) {

		$scope.notifyUser = notifyUser;
		$scope.onFormSubmit = onFormSubmit;
		$scope.user = {
			email: null,
			password: null,
			timestamp: null,
			hashcode: null
		};

		/////////////////////////////////////////////////////////////////////////////////////////////

		function onFormSubmit() {
			$scope.user.timestamp = new Date().getTime();
			var code = $scope.user.email + '|' + $scope.user.password + '|' + $scope.user.timestamp,
				hash = CryptoJS.HmacSHA512(code, 'O1iV@');
			$scope.user.hashcode = hash.toString(CryptoJS.enc.Base64);

			//TODO: Move sessionStorage to a Factory 
			if(sessionStorage.getItem('authToken')) {
				sessionStorage.removeItem('authToken');
				sessionStorage.removeItem('firstTime');
				sessionStorage.removeItem('userEmail');
			}

			sessionStorage.setItem('userEmail', $scope.user.email);
			SugarServices.loginProvider($scope.user);
		}

		function notifyUser() {
			$('#toast-container').addClass('login-toaster');
			if (publicizeToaster.getStatus() === 'success') {
				toaster.pop('success', 'Welcome to Good Hands Provider Protal!', '<h5>Your profile was created successfully! Please allow us 48 hours to activate your account.</h5>', 5000, 'trustedHtml');
				publicizeToaster.setStatus('done');
			}
		}
	}

}());




