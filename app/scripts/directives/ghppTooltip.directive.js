(function(){

	'use strict';

	angular
		.module('GHPP')
		.directive('ghppTooltip', tutorUserOnProfile);

	function tutorUserOnProfile() {
		var directive = {};

		directive.restrict = 'EA';

		directive.templateUrl = 'templates/ghpp-tooltip.html';
	
		directive.link = function() {
			var counter = 0,
				tooltip = $('#ghpp-tooltip'),
				tooltipInfo = $('.tooltip-info'),
				x0 = tooltip.offset().left,
				y0 = tooltip.offset().top,
				objHint1 = $('#general-info'), objHint2 = $('#add-new-btn'), objHint3 = $('#add-new-btn');
				
			tooltip.css({ 'left': objHint1.offset().left - x0, 'top': objHint1.offset().top - 60 - y0 });
		
			tooltipInfo.addClass('translate-tooltip');
			
			$('#next-to').on('click', function(){
				var _this = $(this), parent = _this.parent();
				counter += 1;
				tooltipInfo.removeClass('translate-tooltip');
				if (counter === 1) {					
					tooltip.css({
						'left': objHint2.offset().left - 282 - x0,
						'top': objHint2.offset().top - 120 - y0
					});
					tooltipInfo.addClass('translate-tooltip');
					parent.addClass('step-add-new');
				} else if (counter === 2) {
					tooltip.css({
						'left': objHint3.offset().left - 280 - x0,
						'top': objHint3.offset().top + 200 - y0
					});
					tooltipInfo.addClass('translate-tooltip');
					parent.addClass('step-delete');
				} else if (counter === 3) {
					tooltip.css({
						'left': objHint3.offset().left - 265 - x0,
						'top': objHint3.offset().top - 120 - y0
					});
					tooltipInfo.addClass('translate-tooltip');
					parent.addClass('step-save');
					_this[0].innerHTML = 'Close';
				}
				else {
					tooltip.hide('400');
				}

			});
		}

		return directive;
	}

}());