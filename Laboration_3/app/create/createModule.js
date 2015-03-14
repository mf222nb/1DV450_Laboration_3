
angular.module("myApp.create", ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/create', {
            templateUrl: 'create/createView.html',
            controller: 'CreateCtrl'
        });
    }])
.controller("CreateCtrl", ['$http', '$window','$location','appService','$scope', function($http, $window, $location, appService, $scope){
        var that = this;
        var url = "http://localhost:3000/api/event";

        that.create = function(){
            navigator.geolocation.getCurrentPosition(function(resp){
                var long = resp.coords.longitude;
                var lat = resp.coords.latitude;

                var positionData = { 'long': long, 'lat': lat };
                var event = { 'title': that.title, 'description': that.description };
                var tag = { 'name': that.name};
                var data = {event: event, tags: tag, position: positionData};

                var config = {
                    headers: {
                        "Accept" : "application/json",
                        "Userkey" : $window.sessionStorage.token
                    }
                };

                var promise = $http.post(url, data, config);

                promise.success(function(data){
                    console.log(data);
                    appService.setMsg("Händelsen skapades");
                    $location.path('/main');
                });
                promise.error(function (data) {
                    $scope.error = data.error;
                });
            });



        }
    }]);