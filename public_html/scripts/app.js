var app = angular.module('app', ['ngRoute']);
"use strict";
app.config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            controller: 'appController',
            templateUrl: 'view/mainView.html'
        })
        .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
}]);