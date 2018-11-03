(function () {
    "use strict";

    angular
        .module("app")
        .controller("MenuController", MenuController);

    MenuController.$inject = ["menuService", "$rootScope", "authenticationService"];

    function MenuController(menuService, $rootScope, authenticationService) {
        var vm = this;
        vm.menuItems = [];
        vm.menuGroups = [];

        var authenticated = false;

        $rootScope.$on("authenticated", function () {
            authenticated = true;

            updateMenuItems();
        });

        $rootScope.$on("unauthenticated", function () {
            authenticated = false;

            updateMenuItems();
        });

        activate();

        function activate() {
            vm.menuItems = menuService.getMenuItems();
            vm.menuGroups = getMenuGroups();

            authenticated = authenticationService.isAuthenticated();

            updateMenuItems();
        }

        function getMenuGroups() {
            var groups = [];

            for (var i = 0; i < vm.menuItems.length; i++) {
                var menuItem = vm.menuItems[i];
                var groupName = menuItem.group;

                var group = groups.find(function (currentGroup) {
                    return currentGroup.name === groupName;
                });

                if (group === undefined) {
                    group = {
                        name: groupName,
                        menuItems: []
                    };

                    groups.push(group);
                }

                group.menuItems.push(menuItem);
            }

            return groups;
        }

        function updateMenuItems() {
            for (var i = 0; i < vm.menuItems.length; i++) {
                var item = vm.menuItems[i];

                if (item.hidden) {
                    item.visible = false;
                    continue;
                }

                if (item.unauthenticatedOnly && authenticated) {
                    item.visible = false;
                    continue;
                }

                if (item.requireAuthentication && !authenticated) {
                    item.visible = false;
                    continue;
                }

                item.visible = true;
            }

            for (i = 0; i < vm.menuGroups.length; i++) {
                var group = vm.menuGroups[i];

                var visible = group.menuItems.some(function (item) {
                    return item.visible === true;
                });

                group.visible = visible;
            }
        }
    }
})();
