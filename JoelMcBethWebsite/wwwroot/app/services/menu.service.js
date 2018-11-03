(function () {
    "use strict";

    angular
        .module("app")
        .factory("menuService", menuService);

    menu.$inject = ["authenticationService"];

    function menuService(authenticationService) {
        var menuItems = [
            {
                group: "Main",
                state: "home",
                title: "Home",
                hidden: false
            },
            {
                group: "Main",
                state: "projects",
                title: "Projects",
                hidden: false
            },
            {
                group: "Main",
                state: "media",
                title: "Media",
                hidden: true
            },
            {
                group: "Main",
                state: "books",
                title: "Books",
                hidden: true
            },
            {
                group: "Main",
                state: "resume",
                title: "Resume",
                hidden: true
            },
            {
                group: "Account",
                state: "login",
                title: "Login",
                hidden: true,
                unauthenticatedOnly: true
            },
            {
                group: "Account",
                state: "logout",
                title: "Logout",
                hidden: true,
                requireAuthentication: true
            },
            {
                group: "Users",
                state: "users",
                title: "User List",
                hidden: true,
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