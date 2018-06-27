(function () {
    angular
        .module("app")
        .run(initialize);

    initialize.$inject = ["routeAuthenticationService"];

    function initialize(routeAuthenticationService) {
        routeAuthenticationService.initialize();
    }
})();