/// <reference path="angular.min.js" />
/// <reference path="angular-route.js" />


var app = angular.module('app', ["ngRoute"]);

app.controller('mainCtrl', function ($scope) {
    $scope.text = 'Hello world';
});

app.controller('bookCtrl', function ($scope, bookService) {
    $scope.books = bookService.getBooks();
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

app.service("bookService", function ($http) {
    this.getBooks = function () {
        return [
            {
                title: 'Soft Skills: The software developer\'s life manual',
                authors: ['Sonmez, John']
            }
        ];
    };   
});