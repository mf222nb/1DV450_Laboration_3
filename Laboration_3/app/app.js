'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.main',
  'myApp.login',
  'myApp.logout',
  'myApp.update',
  'myApp.create',
  'myApp.version'
])
.config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/main'});
}])
.service("appService", ['$window', function($window) {
        this.setLoggedIn = function (value) {
            $window.sessionStorage.setItem("isLoggedIn", value)
        };

        this.getLoggedIn = function(){
            return JSON.parse($window.sessionStorage.getItem("isLoggedIn"));
        };

        var message;
        this.setMsg = function(value){
            message = value;
        };

        this.getMsg = function(){
            return message;
        };
}]);
