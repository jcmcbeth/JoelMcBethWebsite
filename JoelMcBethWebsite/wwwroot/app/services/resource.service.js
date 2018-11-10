(function () {
    'use strict';

    angular
        .module('app')
        .factory('resourceService', resourceService);

    resourceService.$inject = ["$http"];

    function resourceService($http) {
        var service = {
            getGroupedResources: getGroupedResources
        };

        return service;

        function getGroupedResources() {
            return $http.get("/data/resources.json").then(function (response) {
                return response.data;
            });
        }
    }
})();