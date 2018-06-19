(function () {
    'use strict';

    angular
        .module('app')
        .factory('authenticationService', authenticationService);

    authenticationService.$inject = ['$http'];

    function authenticationService($http) {
        var service = {
            login: login
        };

        return service;

        function login(userName, password) {
        }
    }
})();