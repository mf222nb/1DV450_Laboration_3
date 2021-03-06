'use strict';

angular.module("myApp.detail", ['ngRoute', 'ngMap'])
.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/detail/:detailId', {
            templateUrl: 'detail/detailView.html'
        });
    }])

.controller("DetailCtrl", ['$routeParams','$http','$scope','$location',function($routeParams, $http, $scope, $location){
        var that = this;
        //Hämtar ut id från URL
        var id = $routeParams.detailId;
        var apiKey = appService.getApiKey();
        var url = appService.getUrl();
        that.event = {};
        that.bool = false;

        var config = {
            headers: {
                "Authorization" : apiKey,
                "Accept" : "application/json"
            }
        };

        //Hämtar ut ett event
        $http.get(url+"/event/" + id, config).success(function(data){
            that.event = data;
            that.bool = true;
        }).error(function (data, statuscode) {
            if(statuscode === 404){
                $location.path('/main');
            }
            $scope.error = data.error;
        });
    }]);
