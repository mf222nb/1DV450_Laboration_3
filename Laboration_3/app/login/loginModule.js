'use strict';

angular.module('myApp.login', ['ngRoute', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/loginView.html'
  });
}])

.controller('LoginCtrl', ['$http', '$scope', '$location', '$cookieStore', '$window','appService', function($http, $scope, $location, $cookieStore, $window, appService) {
        var url = "http://localhost:3000/auth";
        var that = this;

        //Loggar in genom att ta användarnamn och lösenord och sätta dem i headern
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

            //Om allt går bra så sparar jag ner en bool i sessionstorage och ett namn i en cookie tillsammans med ett
            //meddelande
            promise.success(function(data, status, headers, config){
                $cookieStore.put('user', config.headers.name);
                $window.sessionStorage.token = data.auth_token;
                $scope.isLoggedIn = appService.setLoggedIn(true);
                $location.path('/main');
            });

            //Om det går fel så sätter jag ett felmeddelande och sätter token till null
            promise.error(function(data){
                $scope.error = data.error;
                $window.sessionStorage.token = null;
                $scope.isLoggedIn = appService.setLoggedIn(false);
            })
        }
}]);