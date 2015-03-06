angular.module("myApp.logout")

.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/logout', {
            controller: 'LogoutCtrl'
        });
    }])
.controller('LogoutController', [function () {

    }]);
