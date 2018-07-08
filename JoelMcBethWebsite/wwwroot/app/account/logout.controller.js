(function () {
    "use strict";

    angular
        .module("app")
        .controller("LogoutController", LogoutController);

    LogoutController.$inject = ["authenticationService"];

    function LogoutController(authenticationService) {
        /* jshint validthis:true */
        var vm = this;
        vm.message = "You are being logged out.";

        activate();

        function activate() {
            authenticationService.logout()
                .then(function () {
                    vm.message = "You have been logged out!";
                });
        }
    }
})();
