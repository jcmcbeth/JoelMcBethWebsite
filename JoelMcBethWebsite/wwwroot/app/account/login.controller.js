(function () {
    'use strict';

    angular
        .module("app")
        .controller("LoginController", LoginController);

    LoginController.$inject = [];

    function LoginController() {
        /* jshint validthis:true */
        var vm = this;

        activate();

        function activate() {
        }
    }
})();
