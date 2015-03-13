'use strict';

angular.module('myApp.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'main/main.html',
    controller: 'MainCtrl'
  });
}])

.controller('MainCtrl', ['$http', '$scope', '$window','appService','$cookieStore', function($http, $scope, $window, appService, $cookieStore) {
        var that = this;
        $scope.isLoggedIn = appService.getLoggedIn();
        $scope.message = appService.getMsg();

        var getConfig = {
            headers: {
                "Authorization" : "12345",
                "Accept" : "application/json"
            }
        };

        that.getAllEvents = function(){
            $http.get("http://localhost:3000/api/event", getConfig).success(function(data){
                that.events = data;
            }).error(function(data){
                $scope.error = data.error;
            });
        };

        that.getAllEvents();

        $http.get("http://localhost:3000/api/creator", getConfig).success(function(data){
            that.creators = data;
        }).error(function(data){
            $scope.error = data.error;
        });

        $http.get("http://localhost:3000/api/tag", getConfig).success(function(data){
            that.tags = data;
        }).error(function (data) {
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

        that.filterTag = function(id){
            $http.get("http://localhost:3000/api/tag/" + id, getConfig).success(function(data){
                that.events = data;
            }).error(function(data){
                $scope.error = data.error;
            });
        };

        that.filterCreator = function(id){
            $http.get("http://localhost:3000/api/creator/" + id, getConfig).success(function(data){
                that.events = data;
            }).error(function(data){
                $scope.error = data.error;
            });
        };

        that.checkUser = function(checkUser){
            return checkUser === $cookieStore.get('user');
        };
}]);