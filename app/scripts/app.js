/**
 * LoginController<br>
 * ProfileController<br>
 * RegisterController<br>
 * DatePickerController<br>
 * SugarServices Factory
 * @version 1.0
 * @namespace GHPP
 */

(function(){
    'use strict';

    angular
        .module('GHPP', [
                'ngRoute', 
                'validation.match', 
                'flow', 
                'ui.bootstrap', 
                'toaster'])

        .config([
            '$routeProvider', 
            '$httpProvider', 

            function($routeProvider, $httpProvider) {

                // Enable Cross Domain calls
                $httpProvider.defaults.useXDomain = true;
                delete $httpProvider.defaults.headers.common['X-Requested-With'];

                $routeProvider
                    .when('/', {
                        templateUrl: 'views/login.html',
                        controller: 'LoginController'
                    })
                    .when('/register', {
                        templateUrl: 'views/register.html',
                        controller: 'RegisterController'
                    })
                    .when('/profile', {
                        templateUrl: 'views/profile.html',
                        controller: 'ProfileController'
                    })
                    .otherwise({
                        redirectTo: '/'
                });

    }]);

}());