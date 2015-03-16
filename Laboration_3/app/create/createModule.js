
angular.module("myApp.create", ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/create', {
            templateUrl: 'create/createView.html'
        });
    }])
.controller("CreateCtrl", ['$http', '$window','$location','appService','$scope', function($http, $window, $location, appService, $scope){
        var that = this;
        var url = "http://localhost:3000/api/event";

        //När man skapar kollar man om webbläsaren har stöd för geolocation och har den det så får man enfråga om det är
        //okej att geolocation hämtar ens position och då sparar när man fyllt i annars kommer ett meddelande ut.
        that.create = function(){
            if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(resp){
                var long = resp.coords.longitude;
                var lat = resp.coords.latitude;

                var positionData = {'long': long, 'lat': lat};
                var event = {'title': that.title, 'description': that.description};
                var tag = {'name': that.name};
                var data = {event: event, tags: tag, position: positionData};

                var config = {
                    headers: {
                        "Accept": "application/json",
                        "Userkey": $window.sessionStorage.token
                    }
                };

                var promise = $http.post(url, data, config);

                promise.success(function (data) {
                    appService.setMsg("Händelsen skapades");
                    $location.path('/main');
                });
                promise.error(function (data) {
                    $scope.error = data.error;
                });
            }, function(error){
                $scope.$apply(function() {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            $scope.error = "Du har förnekat begäran om Geolocation";
                            console.log($scope.error);
                            break;
                        case error.POSITION_UNAVAILABLE:
                            $scope.error = "Platsinformation är inte tillgänglig.";
                            break;
                        case error.UNKNOWN_ERROR:
                            $scope.error = "Ett okänt fel uppstod.";
                            break;
                    }
                });
            });
            }
            else{
                $scope.error = "Din webbläsare har inte stöd för geolocation";
            }
        };
    }]);