(function(){

	'use strict';

	angular
		.module('GHPP')
		.directive('trashItem', removeVacancyFromView);

	function removeVacancyFromView() {
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			scope: false, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ProfileController', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			// templateUrl: '',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function(scope, iElm, iAttrs, controller) {
				iElm.bind('click', function() {
					var tt = angular.element(iElm.parent());
					$(tt).slideUp(600, function() {
							$(this).remove();
						});
				});
			}
		};
	}

}());