﻿(function () {
    'use strict';

    angular
        .module("app")
        .controller("AddUserController", AddUserController);

    AddUserController.$inject = ["userService"];

    function AddUserController(userService) {
        var vm = this;
        vm.addUser = addUser;
        vm.user = null;

        activate();

        function activate() {
        }

        function addUser() {
            vm.user.userName = vm.user.email;

            userService.addUser(vm.user)
                .then(addUserComplete);

            function addUserComplete() {
                vm.user = null;
            }
        }
    }
})();
