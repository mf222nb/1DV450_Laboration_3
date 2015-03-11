'use strict';

angular.module("myApp.logout", ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/logout', {
            templateUrl: 'main/main.html',
            controller: 'LogoutCtrl'
        });
    }])
.controller('LogoutCtrl', ['$window', 'appService', function ($window, appService) {
        appService.setLoggedIn(false);
}]);
