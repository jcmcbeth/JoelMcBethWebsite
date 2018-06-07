/// <reference path="angular.min.js" />
/// <reference path="angular-route.js" />


var app = angular.module('app', ["ngRoute"]);

app.controller('mainCtrl', function ($scope) {
    $scope.text = 'Hello world';
});

app.controller('bookCtrl', function ($scope, bookService) {
    bookService.getBooks()
        .then(function (response) {
            $scope.books = response.data;
        });
});

app.controller('resumeCtrl', function ($scope, $http) {
    $http.get("resume.json")
        .then(function (response) {
            $scope.resume = response.data;
        });
});

app.config(function ($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
        templateUrl: 'home.html'
    })
    .when('/books', {
        templateUrl: 'books.html',
        controller: 'bookCtrl'
    })
    .when("/resume", {
        templateUrl: 'resume.html',
        controller: 'resumeCtrl'
    });
});

app.service("bookService", function ($http) {
    this.getBooks = function () {
        return $http.get("/api/books");
    };   
});