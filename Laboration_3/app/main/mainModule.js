'use strict';

angular.module('myApp.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'main/main.html'
  });
}])

.controller('MainCtrl', ['$http', '$scope', '$window','appService','$cookieStore','$location', function($http, $scope, $window, appService, $cookieStore, $location) {
        //Byter class namn i menyn så att man vet vilken sida man är på.
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
        var that = this;
        $scope.isLoggedIn = appService.getLoggedIn();
        $scope.message = appService.getMsg();

        //Configuration för att få in rätt headers till requestet
        var getConfig = {
            headers: {
                "Authorization" : "12345",
                "Accept" : "application/json"
            }
        };

        //Hämtar ut alla events
        that.getAllEvents = function(){
            $http.get("http://localhost:3000/api/event", getConfig).success(function(data){
                that.events = data;
            }).error(function(data){
                $scope.error = data.error;
            });
        };

        that.getAllEvents();

        //Hämtar ut alla creators
        $http.get("http://localhost:3000/api/creator", getConfig).success(function(data){
            that.creators = data;
        }).error(function(data){
            $scope.error = data.error;
        });

        //Hämtar ut alla taggar
        $http.get("http://localhost:3000/api/tag", getConfig).success(function(data){
            that.tags = data;
        }).error(function (data) {
            $scope.error = data.error;
        });

        //Tar bort ett event
        that.removeEvent = function(id){
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
                $scope.error = data.message_for_user;
            })
        };

        //Filtrera på taggar
        that.filterTag = function(id){
            $http.get("http://localhost:3000/api/tag/" + id, getConfig).success(function(data){
                that.events = data;
            }).error(function(data){
                $scope.error = data.error;
            });
        };

        //Filtrera på skapare
        that.filterCreator = function(id){
            $http.get("http://localhost:3000/api/creator/" + id, getConfig).success(function(data){
                that.events = data;
            }).error(function(data){
                $scope.error = data.error;
            });
        };

        //Kollar vilken användare som är inne och visa knappar för den personens egna event.
        that.checkUser = function(checkUser){
            return checkUser === $cookieStore.get('user');
        };
}]);