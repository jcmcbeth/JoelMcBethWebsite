(function () {
    "use strict";

    angular
        .module("app")
        .factory("menuService", menuService);

    menu.$inject = [];

    function menuService() {
        var menuItems = [
            {
                group: "Main",
                state: "home",
                title: "Home",

            },
            {
                group: "Main",
                state: "projects",
                title: "Projects"
            },
            {
                group: "Main",
                state: "books",
                title: "Books",
                hidden: true,
            },
            {
                group: "Main",
                state: "resume",
                title: "Resume",
                hidden: true
            },
            {
                group: "Users",
                state: "users",
                title: "User List",
                requireAuthentication: true
            }
        ];

        var service = {
            getMenuItems: getMenuItems
        };

        return service;

        function getMenuItems() {
            return menuItems;
        }
    }
})();