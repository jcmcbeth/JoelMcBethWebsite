(function () {
    'use strict';

    angular
        .module('app')
        .factory('resourceService', resourceService);

    resourceService.$inject = ["$q"];

    function resourceService($q) {
        var service = {
            getResources: getResources,
            getResourceGroups: getResourceGroups
        };

        return service;

        function getResourceGroups() {
            var groups = [
                {
                    name: "Applications",
                    description: "",
                    subgroups: [
                        {
                            name: "Tools"
                        }
                    ]
                }
            ];

            return $q(groups);
        }

        function getResources() {
            var resources = [
                {
                    url: "",
                    title: "",
                    description: ""
                }
            ];

            return $q(resources);
        }
    }
})();