(function () {
    "use strict";

    angular
        .module("app")
        .controller("MenuController", MenuController);

    MenuController.$inject = ["menuService"];

    function MenuController(menuService) {
        var vm = this;

        activate();

        function activate() {
            vm.menuItems = menuService.getMenuItems();
        }
    }
})();
