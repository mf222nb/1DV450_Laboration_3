'use strict';

angular.module("myApp.logout", ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/logout', {
            templateUrl: 'main/main.html',
            controller: 'LogoutCtrl'
        });
    }])
.controller('LogoutCtrl', ['$window', 'appService','$cookieStore', function ($window, appService, $cookieStore) {
        //När man loggar ut så sätter jag boolen till false och tar bort kakan med användarnamn
        appService.setLoggedIn(false);
        $cookieStore.remove('user');
}]);
