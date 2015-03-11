'use strict';

angular.module('myApp.main', ['ngRoute', 'ngMap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'main/main.html',
    controller: 'MainCtrl'
  });
}])

.controller('MainCtrl', ['$http', '$scope', '$window','appService', function($http, $scope, $window, appService) {
        var that = this;
        $scope.isLoggedIn = appService.getLoggedIn();
        $scope.message = appService.getMsg();

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

        that.removeEvent = function(id){
            console.log(id);
            var index = that.events.map(function(e) { return e.id; }).indexOf(id);
            var url = "http://localhost:3000/api/event/" + id;
            var config = {
                headers : {
                    "Accept" : "application/json",
                    "Userkey" : $window.sessionStorage.token
                }
            };

            var promise = $http.delete(url, config);

            promise.success(function (){
                that.events.splice(index, 1);
                appService.setMsg("Händelsen är borttagen");
                $scope.message = appService.getMsg();
            });

            promise.error(function(data){
                $scope.error = data.error;
            })
        };
}]);