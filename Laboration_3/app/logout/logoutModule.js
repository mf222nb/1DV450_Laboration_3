'use strict';

angular.module("myApp.logout", ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/logout', {
            templateUrl: 'main/main.html',
            controller: 'LogoutCtrl'
        });
    }])
.controller('LogoutCtrl', ['$window', 'appService','$cookieStore', function ($window, appService, $cookieStore) {
        //När man loggar ut så tömmer jag sessionstorage
        $window.sessionStorage.clear();
        $cookieStore.remove('user');
}]);
