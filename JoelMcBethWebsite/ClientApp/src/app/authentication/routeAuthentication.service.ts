/// <reference path="../../../client/typings/angularjs/index.d.ts" />

class RouteAuthenticationService {
    static $inject = ["$rootScope", "$state", "$transitions", "AuthenticationService"];

    constructor(private $rootScope, private $state, private $transitions, private authenticationService) {

    }

    initialize() {
        this.$transitions.onStart({}, this.onRouteStart);
    }

    onRouteStart(transition) {
        const stateService = transition.router.stateService;
        const stateData = transition.to().data;
        const requireAuthentication = stateData && stateData.requireAuthentication;
        const authenticationService = transition.injector().get("AuthenticationService");

        if (requireAuthentication && authenticationService.isAuthenticated() === false) {
            return stateService.target("login");
        }
    }
}

angular
    .module("app")
    .service("routeAuthenticationService", RouteAuthenticationService);