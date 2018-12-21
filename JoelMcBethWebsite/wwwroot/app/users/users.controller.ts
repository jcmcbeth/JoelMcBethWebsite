/// <reference path="../../../client/typings/angularjs/index.d.ts" />

(function () {
    "use strict";

    angular
        .module("app")
        .controller("UsersController", UsersController);

    UsersController.$inject = ["userService"];

    function UsersController(userService) {
        var vm = this;
        vm.page = 1;
        vm.pageSize = 15;

        activate();

        function activate() {
            updateUsers();
        }

        function updateUsers() {
            userService.getUsers(vm.page, vm.pageSize).then(function (data) {
                console.log(data.users);
                vm.users = data.users;
                vm.pageCount = data.pagination.pageCount;
            });
        }
    }
})();
