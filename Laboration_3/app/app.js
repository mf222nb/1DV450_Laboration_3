'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngMap',
  'myApp.main',
  'myApp.login',
  'myApp.logout',
  'myApp.update',
  'myApp.create',
  'myApp.detail',
  'myApp.version'
])
.config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/main'});
}])
.service("appService", ['$window', function($window) {
        //Lägger en bool i sessionstorage om man är inloggad eller inte
        this.setLoggedIn = function (value) {
            $window.sessionStorage.setItem("isLoggedIn", value)
        };

        //Hämtar ut boolen som är antingen true eller false
        this.getLoggedIn = function(){
            return JSON.parse($window.sessionStorage.getItem("isLoggedIn"));
        };

        //Sätter ett meddelande
        var message;
        this.setMsg = function(value){
            message = value;
        };

        //Hämtar ut ett meddelande
        this.getMsg = function(){
            return message;
        };
}])

.directive("myMenu", function(){
        //Returnerar en vy med en meny i.
        return {
            restrict: 'E',
            templateUrl: 'menu.html'
        }
    });
