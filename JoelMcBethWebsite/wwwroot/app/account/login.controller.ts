/// <reference path="../../../client/typings/angularjs/index.d.ts" />
(function () {
    'use strict';

    angular
        .module("app")
        .controller("LoginController", LoginController);

    LoginController.$inject = ["authenticationService", "$state"];

    function LoginController(authenticationService, $state) {
        /* jshint validthis:true */
        var vm = this;
        vm.login = login;

        activate();

        function login() {
            console.log("Login pressed.");
            vm.error = null;

            authenticationService.login(vm.username, vm.password)
                .then(onLoginSuccess, onLoginFailure);

            function onLoginSuccess() {
                $state.go("home");
            }

            function onLoginFailure(error) {
                vm.error = error;
            }
        }

        function activate() {
        }
    }
})();
