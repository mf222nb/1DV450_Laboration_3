'use strict';

angular.module("myApp.detail", ['ngRoute', 'ngMap'])
.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/detail/:detailId', {
            templateUrl: 'detail/detailView.html',
            controller: 'DetailCtrl'
        });
    }])

.controller("DetailCtrl", ['$routeParams','$http',function($routeParams, $http){
        var that = this;
        var id = $routeParams.detailId;

        var url = "http://localhost:3000/api/event/" + id;

        var config = {
            headers: {
                "Authorization" : "12345",
                "Accept" : "application/json"
            }
        };

        $http.get(url, config).success(function(data){

        })
    }]);
