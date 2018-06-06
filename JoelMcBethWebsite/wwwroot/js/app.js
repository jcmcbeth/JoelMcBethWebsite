/// <reference path="angular.min.js" />

var app = angular.module('app', []);

app.controller('mainCtrl', function ($scope) {
    $scope.text = 'Hello world';
});