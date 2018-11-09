(function () {
    'use strict';

    angular
        .module('app')
        .factory('resourceService', resourceService);

    resourceService.$inject = ["$http"];

    function resourceService($http) {
        var service = {
            getResources: getResources
        };

        return service;

        function getResources() {
            return $http.get("/data/resources.json").then(function (response) {
                return response.data;
            });
        }
    }
})();