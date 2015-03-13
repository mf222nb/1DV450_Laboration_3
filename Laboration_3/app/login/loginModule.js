'use strict';

angular.module('myApp.login', ['ngRoute', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/loginView.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$http', '$scope', '$location', '$cookieStore', '$window','appService', function($http, $scope, $location, $cookieStore, $window, appService) {
        var url = "http://localhost:3000/auth";
        var that = this;

        that.login = function(){
            var data = { 'name': that.name, 'password': that.password };
            var config = {
                headers:{
                    "Accept" : "application/json",
                    "name" : data.name,
                    "password" : data.password
                }
            };

            var promise = $http.post(url, data, config);

            promise.success(function(data, status, headers, config){
                $cookieStore.put('user', config.headers.name);
                $window.sessionStorage.token = data.auth_token;
                $scope.isLoggedIn = appService.setLoggedIn(true);
                $location.path('/main');
            });

            promise.error(function(data){
                $scope.error = data.error;
                $window.sessionStorage.token = null;
                $scope.isLoggedIn = appService.setLoggedIn(false);
            })
        }
}]);