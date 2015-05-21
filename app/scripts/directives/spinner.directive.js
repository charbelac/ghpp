(function(){

	'use strict';

	angular
		.module('GHPP')
		.directive('spinner', createSpinner);

	function createSpinner() {
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			scope: false, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ProfileController', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			templateUrl: 'templates/spinner.html',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function(scope, iElm, iAttrs, controller) {

				$(iElm).height($('#provider-profile').height());
				
				for (var i = 1; i <= 16; i++) {
					$('div.loader').append('<span class="block-' + i + '"></span>');
				}
			}
		};
	}
}());