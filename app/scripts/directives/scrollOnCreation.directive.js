(function(){

	'use strict';

	angular
		.module('GHPP')
		.directive('scrollOnCreation', scrollWindowTo);

	function scrollWindowTo() {
		// Runs during compile
		return {
			restrict: 'A',
			link: function(scope, $elm) {

				$($elm).on('click', function(){

					if ($('.vacancy > li:last-child').length) {
						var li = $('.vacancy > li:last-child');
						var top = li.offset().top + 300;
						
						$("body").animate({scrollTop: top }, 600, function() {
											$('.vacancy > li:last-child').addClass('vacancy-color-transition');
										});
					}

					
				});

			}
		};
	}

}());