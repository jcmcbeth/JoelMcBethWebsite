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
            //{
            //    group: "Main",
            //    state: "media",
            //    title: "Media",
            //    visible: false
            //},
            //{
            //    group: "Main",
            //    state: "books",
            //    title: "Books",
            //    visible: false
            //},
            //{
            //    group: "Main",
            //    state: "resume",
            //    title: "Resume",
            //    visible: false
            //},
            //{
            //    group: "Account",
            //    state: "login",
            //    title: "Login",
            //    visible: false,
            //    unauthenticatedOnly: true
            //},
            //{
            //    group: "Account",
            //    state: "logout",
            //    title: "Logout",
            //    visible: false,
            //    requireAuthentication: true
            //},
            //{
            //    group: "Users",
            //    state: "users",
            //    title: "User List",
            //    visible: false,
            //    requireAuthentication: true
            //}
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