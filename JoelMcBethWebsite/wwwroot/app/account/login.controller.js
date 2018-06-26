(function () {
    'use strict';

    angular
        .module("app")
        .controller("LoginController", LoginController);

    LoginController.$inject = ["authenticationService"];

    function LoginController(authenticationService) {
        /* jshint validthis:true */
        var vm = this;
        vm.login = login;

        activate();

        function login() {
            console.log("Login pressed.");
            authenticationService.login(vm.email, vm.password);
        }

        function activate() {
        }
    }
})();
