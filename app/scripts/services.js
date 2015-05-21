(function(){
	'use strict';

	angular
		.module('GHPP')
		.factory('SugarServices', SugarServices)
		.factory('sharedDate', sharedDate)
		.factory('broadcastProfile', broadcastProfile)
		.factory('broadcastEnvelope', broadcastEnvelope)
		.factory('publicizeToaster', publicizeToaster);

	SugarServices.$inject = ['$http', '$location', 'toaster', 'publicizeToaster', 'broadcastProfile', 'broadcastEnvelope'];

	/** @namespace SugarServices
	 * @desc Manage the communication between GHPP app & Sugar CRM services
	 * @since 1.0
 	 * @memberOf GHPP
 	 */

	function SugarServices($http, $location, toaster, publicizeToaster, broadcastProfile, broadcastEnvelope) {

		var host = ($location.host() !== 'localhost') ? $location.host() : 'localhost:8888',
			token = null;

		return {
			loginProvider: loginProvider,
			registerProvider: registerProvider,
			updateProfile: updateProfile,
			getProfile: getProfile,
			fetchDocuSign: fetchDocuSign
		};

		/////////////////////////////////////////////////////////////////////////////////////////////

		/** 
		 * @function loginProvider
		 * @desc Handles the login service
		 * @param {object} user - provider email & password
		 * @memberOf GHPP.SugarServices
		 * @since 1.0
	 	 */

		function loginProvider(user) {

			$http.post('http://' + host + '/auth', user)
				.then( function(res){
							token = res.data.AuthToken;
							sessionStorage.setItem('authToken', token);
							sessionStorage.setItem('firstTime', 'true');
							getProfile(token);
					}, function(reason){
							var status = reason.status,
								text = reason.statusText;
							switch (status) {
								case 401:
									toaster.pop('error', text, 'Please try different email and/or password!');
									break;
								default:
									toaster.pop('error', 'Sorry, Something went wrong.', 'Please try again!');
							}
					}
				);
		}

		/** 
		 * @function registerProvider
		 * @desc Handles provider registration service
		 * @param {object} provider - registration data object
		 * @memberOf GHPP.SugarServices
		 * @since 1.0
	 	 */
		
		function registerProvider(provider) {
			$http.post('http://' + host + '/registerdata?secret=O1iV@', provider)
				.then(	function(response){
							publicizeToaster.setStatus('success');
							$location.path('/');
					}, 	function(reason){
							toaster.pop('error', 'Sorry, Something went wrong.', 'Please try registering again!');
					}
				);
		}

		/** 
		 * @function updateProfile
		 * @desc Handles updating profile service
		 * @param {string} tkn - Authorization Token
		 * @param {object} obj - profile data object 
		 * @memberOf GHPP.SugarServices
		 * @since 1.0
	 	 */
		
		function updateProfile(tkn, obj) {
			return $http.post('http://' + host + '/providerdata?AuthToken=' + tkn, obj)
					.then(	function(response){
								toaster.pop('success', '', '<h5>Your data was saved successfully!</h5>', 5000, 'trustedHtml');				
						}, 	function(reason){
								toaster.pop('error', "Sorry, we couldn't save your data.", 'Please try again!');
						}
					);
		}

		/** 
		 * @function getProfile
		 * @desc Handles fetching profile service
		 * @param {string} tkn - Authorization Token 
		 * @memberOf GHPP.SugarServices
		 * @since 1.0
	 	 */

		function getProfile(tkn) {
			
			return $http.get('http://' + host + '/providerdata?AuthToken=' + tkn)
						.then(	function(response){
									broadcastProfile.setResponse(response.data);
									if ($location.path() === '/') $location.path('/profile');
							}, 	function(reason){ 
									var text = reason.statusText,
										details = reason.data.Details;
									switch (reason.status) {
										case 401:
											$location.path('/');
										case 404:
											toaster.pop('error', text, details);
											break;
										default:
											toaster.pop('error', 'Sorry, Something went wrong.', 'Please try again!');
									}
								}
							);
		}

		/** 
		 * @function fetchDocuSign
		 * @desc Returns a list of all PDF documents assigned to said user 
		 * @param {string} tkn - Authorization Token 
		 * @memberOf GHPP.SugarServices
		 * @since 1.1
	 	 */

		function fetchDocuSign(tkn) {

			return $http.get('http://' + host + '/docsandsignatures?AuthToken=' + tkn)
			//return $http.get('http://localhost:8888/dist/data/docusign.json')
						.then( function(response){
							var doc = response.data;
							
							for (var i=0; i<doc.signatures.length; i++)
								doc.signatures[i].sentDateTime = moment.utc(doc.signatures[i].sentDateTime).local().format('MM-DD-YYYY');	
							
							for (var j=0; j<doc.documentHistory.length; j++)
								doc.documentHistory[j].completedDateTime = moment.utc(doc.documentHistory[j].completedDateTime).local().format('MM-DD-YYYY');	
							
							broadcastEnvelope.setResponse(doc);
							
						}, function(reason){
							toaster.pop('error', 'Sorry, Something went wrong.', 'Please try again!');
						});
		}
	}

	/** @function broadcastProfile 
 	 * @desc Getter/Setter Provides access to the profile data through ProviderController & SugarServices
 	 * @return profile {object}
 	 * @since 1.0
 	 */
	function broadcastProfile() {

		var response;

		return {
			getResponse: function() {
				return response;
			},

			setResponse: function(res) {
				response = res;
			}
		};
	}

	/** @function broadcastEnvelope
	 * @desc Getter/Setter For Docu Sign - Handles signed and required documents
 	 * @return Envelope data {object}
 	 * @since 1.1
 	 */
	function broadcastEnvelope() {
		var response;

		return {
			getResponse: function() {
				return response;
			},

			setResponse: function(res) {
				response = res;
			}
		};
	}

	/** @function sharedDate
	 * @desc Getter/Setter Handles the availability date communication between ProfileController & DatePickerController
 	 * @return availability date {object}
 	 * @since 1.0
 	 */
	function sharedDate() {
		var date = {
			val: '',
			id: null	
		};
	
		return {

			getDate: function() {
				return date;
			},

			setDate: function(dt, index) {
				date = {
					val: dt,
					id: index
				};
			}
		};
	}

	/** @function publicizeToaster
	 * @desc Getter/Setter Decision maker for displaying notifications and their associated messages across the application
 	 * @return 'notification status' {string}
 	 * @since 1.0
 	 */
	function publicizeToaster() {

		var status = '';

		return {
			getStatus: function() {
				return status;
			},

			setStatus: function(dt) {
				status = dt;
			}
		};
	}

}());