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
                visible: true
            },
            {
                group: "Main",
                state: "projects",
                title: "Projects",
                visible: true
            },
            {
                group: "Main",
                state: "books",
                title: "Books",
                visible: true,
            },
            {
                group: "Main",
                state: "resume",
                title: "Resume",
                visible: true
            },
            {
                group: "Account",
                state: "login",
                title: "Login",
                visible: true,
                unauthenticatedOnly: true
            },
            {
                group: "Account",
                state: "logout",
                title: "Logout",
                visible: true,
                requireAuthentication: true
            },
            {
                group: "Users",
                state: "users",
                title: "User List",
                visible: true,
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