(function(){

	'use strict';

	/** @function DatePickerController
	 * @desc Using Bootstrap-UI to display a calendar date picker
	 * @param {module} $scope - DatePicker Data-Model
	 * @memberOf GHPP
 	 */

	angular
		.module('GHPP')
		.controller('DatePickerController', DatePickerController);

		DatePickerController.$inject = ['$scope'];

		function DatePickerController($scope) {
			
			$scope.dateOptions = {
				formatYear: 'yyyy',
				startingDay: 1,
				showWeeks: false
			};
			
			$scope.open = open;

			/////////////////////////////////////////////////////////////////////////////////////////////
			
			function open($event) {
				$event.preventDefault();
				$event.stopPropagation();
				$scope.opened = true;
			}

		}
}());