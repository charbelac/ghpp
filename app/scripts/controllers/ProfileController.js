(function(){

	'use strict';

	/** @function ProfileController
	 * @desc Profile View Controller, handles fetching user profile, updating facility, upload images, add/remove vacancy, sign out & display tutorial for first time user
	 * @param {module} $scope - profile Data-Model
	 * @param {service} $location 
 	 * @param {service} SugarServices - {@link GHPP.SugarServices}
 	 * @param {service} broadcastProfile - {@link broadcastProfile}
 	 * @param {service} broadcastEnvelope - {@link broadcastEnvelope}
 	 * @param {service} sharedDate - {@link sharedDate}
 	 * @memberOf GHPP
 	 */
	
	angular
		.module('GHPP')
		.controller('ProfileController', ProfileController);

	ProfileController.$inject = ['$scope', '$location', 'SugarServices', 'sharedDate', 'broadcastProfile', 'broadcastEnvelope'];

	function ProfileController ($scope, $location, SugarServices, sharedDate, broadcastProfile, broadcastEnvelope) {

		$scope.addVacancy = addVacancy;
		$scope.docuSign = {};
		$scope.isToolTip = false;
		$scope.profileLoaded = true;
		$scope.refresh = refresh;
		$scope.removeVacancy = removeVacancy;
		$scope.saveFacility = saveFacility;
		$scope.signOut = signOut;
		$scope.userEmail = sessionStorage.getItem('userEmail');

		var token = sessionStorage.getItem('authToken');
		fetchProfileOnLoadView();
		
		// Update Availibility Date through the sharedDate Service 
		$scope.$watch(function () { 
			return sharedDate.getDate(); 
		}, function (newDate) {
			if (newDate.val !== '' && $scope.organization)
				$scope.organization.vacancies[newDate.id].availability = newDate.val;
		});

		/////////////////////////////////////////////////////////////////////////////////////////////

		// Fired When Image Successfuly Added To The scope
		$scope.onSuccess = function(file, msg) {
			//console.warn(file, msg);	
		}

		if (!localStorage['profile-tutorial']) {
			localStorage.setItem('profile-tutorial', 'true');
			$scope.isToolTip = true;
		}

		function fetchProfileOnLoadView() {
			if (sessionStorage.getItem('authToken')) {
				
				if (sessionStorage.getItem('firstTime') === 'false') {
					SugarServices.getProfile(token)
									.then( function(){
										$scope.organization = broadcastProfile.getResponse();
									});
				} else {
					sessionStorage.setItem('firstTime', 'false');
					$scope.organization = broadcastProfile.getResponse();
				}

				SugarServices.fetchDocuSign(token)
								.then( function(){
									$scope.docuSign = broadcastEnvelope.getResponse();
									$scope.profileLoaded = false;
								});
				
			} else {
				$location.path('/');
			}
			// This should be moved to toaster directive
			$('#toast-container').removeClass('login-toaster');
		}

		function saveFacility() {
			SugarServices
				.updateProfile(token, $scope.organization)
				.then(function() {
					SugarServices.getProfile(token)
						.then( function(){
							$scope.organization = broadcastProfile.getResponse();
						});
				});
		};

		function addVacancy() {
			$scope.organization.vacancies.push({
				'vacancyId': '',
				'name': '',
				'modifiedOn': '',
				'description': '',
				'type': '',
				'status': '',
				'availability': '',
				'image': '',
				'facilityId': $scope.organization.facilityId
			});			
		};

		function removeVacancy(evt) {
			var id = $(evt.target).closest('li').index();
			var vacancy = $scope.organization.vacancies[id];
			this.vacancyState = 'dissolve';
			if (vacancy.vacancyId === '') {
				vacancy.name = 'tbd';
				vacancy.type = 'SingleRoom';
				vacancy.availability = '01-02-2015';	
			}
			vacancy.delFlag = 'true';
		};

		function signOut() {
			sessionStorage.removeItem('authToken');
			sessionStorage.removeItem('firstTime');
			sessionStorage.removeItem('userEmail');
			$location.path('/');
		}

		function refresh() {

			$scope.profileLoaded = true;

			SugarServices
				.getProfile(token)
					.then( function(){
						$scope.organization = broadcastProfile.getResponse();
					});

			SugarServices
				.fetchDocuSign(token)
					.then( function(){
						$scope.docuSign = broadcastEnvelope.getResponse();
						$scope.profileLoaded = false;
					});
		}

	}

}());




