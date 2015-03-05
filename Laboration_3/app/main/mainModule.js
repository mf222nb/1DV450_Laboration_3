'use strict';

angular.module('myApp.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'main/main.html',
    controller: 'MainCtrl'
  });
}])

.controller('MainCtrl', ['$http', '$scope', function($http, $scope) {
        var that = this;

        var getConfig = {
            headers: {
                "Authorization" : "12345",
                "Accept" : "application/json"
            }
        };

        $http.get("http://localhost:3000/api/event", getConfig).success(function(data){
            console.log(data);
            that.events = data;
        }).error(function(data, status){
            $scope.error = data.error;
        });
}]);