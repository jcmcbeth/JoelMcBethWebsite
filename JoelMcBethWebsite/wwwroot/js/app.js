/// <reference path="angular.min.js" />
/// <reference path="angular-route.js" />


var app = angular.module('app', ["ngRoute"]);

app.controller('mainCtrl', function ($scope) {
    $scope.text = 'Hello world';
});

app.controller('bookCtrl', function ($scope) {
    $scope.books = [
        {
            title: 'Soft Skills: The software developer\'s life manual',
            authors: ['Sonmez, John']
        }
    ]
});

app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.when('/', {
        templateUrl: 'home.html'
    })
    .when('/books', {
        templateUrl: 'books.html',
        controller: 'bookCtrl'
    });
});