'use strict';

angular.module('myApp.login', ['ngRoute', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/loginView.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$http', '$scope', '$location', '$rootScope', '$cookieStore', '$window' , function($http, $scope, $location, $rootScope, $cookieStore, $window) {
        var url = "http://localhost:3000/auth";
        $window.sessionStorage.isLoggedIn = false;
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
                console.log(data);
                $cookieStore.put('user', config.headers.name);
                $window.sessionStorage.token = data.auth_token;
                $window.sessionStorage.isLoggedIn = true;
                console.log($window.sessionStorage.isLoggedIn);
                $location.path('/main');
            });

            promise.error(function(data, status, headers, config){
                console.log(status);
                console.log(data.error);
                $scope.error = data.error;
                $window.sessionStorage.token = null;
                $window.sessionStorage.isLoggedIn = false;
            })
        }
}]);