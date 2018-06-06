/// <reference path="angular.min.js" />
/// <reference path="angular-route.js" />


var app = angular.module('app', ["ngRoute"]);

app.controller('mainCtrl', function ($scope) {
    $scope.text = 'Hello world';
});

app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: 'home.html'
    })
    .when("/books", {
        templateUrl: 'books.html'
    });
});