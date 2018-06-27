(function () {
    "use strict";

    angular
        .module("app")
        .factory("routeAuthenticationService", routeAuthenticationService);

    routeAuthenticationService.$inject = ["$rootScope", "$state", "$transitions", "authenticationService"];

    function routeAuthenticationService($rootScope, $state, $transitions, authenticationService) {
        var service = {
            initialize: initialize
        };

        return service;

        function initialize() {
            $transitions.onStart({}, onRouteStart);
        }

        function onRouteStart(transition) {
            console.log(transition);

            const stateService = transition.router.stateService;
            const stateData = transition.to().data;
            const requireAuthentication = stateData != null && stateData.requireAuthentication;
            const authenticationService = transition.injector().get("authenticationService");

            if (requireAuthentication && authenticationService.isAuthenticated() === false) {
                return stateService.target("login");
            }
        }
    }
})();