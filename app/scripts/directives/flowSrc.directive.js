(function(){

	'use strict';

	angular
		.module('GHPP')
		.directive('flowSrc', uploadImageOnClick);

	uploadImageOnClick.$inject = ['SugarServices', 'broadcastProfile', '$timeout'];


	function uploadImageOnClick(SugarServices, broadcastProfile, $timeout) {
		return {
			scope: true,
			restrict: 'A',
			controller: function($scope) {
				//console.log('FlowSrc Ctrl: ',$scope);
			},
			link: function(scope, ele, attrs) {
				
				var elementType = (ele.hasClass('vacancy-image')) ? 'vacancy' : 'facility',
					id = $(ele).closest('li').index();

				scope.$watch(function() {
						return attrs.src;
					}, function(){
					
						if (attrs.src && attrs.src.substr(0, 10) === 'data:image') {
							if (elementType === 'facility')
								scope.organization.images[id].source = attrs.src;
							else
								scope.organization.vacancies[id].image = attrs.src;
							
							var tkn = sessionStorage.getItem('authToken');
							// Find a better way to get for the parent scope
							SugarServices.updateProfile(tkn, scope.$parent.$parent.$parent.organization)
											.then(function() {
												SugarServices.getProfile(tkn)
													.then( function(){
														$timeout(function(){
															scope.$parent.$parent.$parent.organization = broadcastProfile.getResponse();
														}, 2000);
													});
											});

						}

				});
			}
		};
	}

}());