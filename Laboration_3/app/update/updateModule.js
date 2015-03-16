angular.module("myApp.update", ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/update/:eventId', {
            templateUrl: 'update/updateView.html',
            controller: 'UpdateCtrl'
        });
}])
.controller("UpdateCtrl", ['$routeParams','$window','$http','$location','appService','$scope', function($routeParams, $window, $http, $location, appService, $scope){
        var that = this;
        var id = $routeParams.eventId;
        var url = "http://localhost:3000/api/event/" + id;


        var getConfig = {
            headers:{
                "Accept": "application/json",
                "Authorization" : "12345"
            }
        };
        $http.get(url, getConfig).success(function (data) {
            that.title = data.title;
            that.description = data.description;
        }).error(function(data){
            $scope.error = data.error;
        });

        that.update = function(){
            var data = { 'title': that.title, 'description' : that.description };

            var config = {
                headers: {
                    "Accept" : "application/json",
                    "Userkey" : $window.sessionStorage.token
                }
            };

            var promise = $http.put(url, data, config);

            promise.success(function(data){
                appService.setMsg("Händelsen är uppdaterad");
                $location.path('/main');
            });

            promise.error(function(data){
                $scope.error = data.message_for_user;
            })
        }
}]);
