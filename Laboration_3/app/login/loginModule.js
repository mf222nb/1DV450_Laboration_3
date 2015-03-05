'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/loginView.html',
    controller: 'LoginCtrl'
  });
}])
.factory('message', function () {
        return {};
    })

.controller('LoginCtrl', ['$http', '$scope', '$location' , function($http, $scope, $location) {
        var url = "http://localhost:3000/auth";
        $scope.isLoggedIn = false;
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
                console.log($scope.message);
                $scope.token = data.auth_token;
                $scope.isLoggedIn = true;
                $location.path('/main');
            });

            promise.error(function(data, status, headers, config){
                console.log(status);
                console.log(data.error);
                $scope.error = data.error;
                $scope.token = null;
                $scope.isLoggedIn = false;
            })
        }
}]);