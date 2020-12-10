﻿/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="../authentication/authentication.service.ts" />
/// <reference path="menu-item.ts" />

class MenuService {
    static $inject = ["AuthenticationService"];

    public menuItems: MenuItem[];

    constructor(private authenticationService: AuthenticationService) {
        this.menuItems = [
            {
                group: "Main",
                state: "home",
                title: "Home",
                hidden: false,
                unauthenticatedOnly: false,
                requireAuthentication: false
            },
            {
                group: "Main",
                state: "projects",
                title: "Projects",
                hidden: false,
                unauthenticatedOnly: false,
                requireAuthentication: false
            },
            {
                group: "Main",
                state: "media",
                title: "Media",
                hidden: true,
                unauthenticatedOnly: false,
                requireAuthentication: false
            },
            {
                group: "Main",
                state: "books",
                title: "Books",
                hidden: false,
                unauthenticatedOnly: false,
                requireAuthentication: false
            },
            {
                group: "Main",
                state: "resume",
                title: "Resume",
                hidden: true,
                unauthenticatedOnly: false,
                requireAuthentication: false
            },
            {
                group: "Main",
                state: "resources",
                title: "Resources",
                hidden: false,
                unauthenticatedOnly: false,
                requireAuthentication: false
            },
            {
                group: "Main",
                state: "misc",
                title: "Misc",
                hidden: false,
                unauthenticatedOnly: false,
                requireAuthentication: false
            },
            {
                group: "Main",
                state: "cameras",
                title: "Cameras",
                hidden: false,
                unauthenticatedOnly: false,
                requireAuthentication: true
            },
            {
                group: "Account",
                state: "login",
                title: "Login",
                hidden: false,
                unauthenticatedOnly: true,
                requireAuthentication: false
            },
            {
                group: "Account",
                state: "logout",
                title: "Logout",
                hidden: false,
                unauthenticatedOnly: false,
                requireAuthentication: true
            },
            {
                group: "Users",
                state: "users",
                title: "User List",
                hidden: false,
                unauthenticatedOnly: false,
                requireAuthentication: true
            },
            {
                group: "Admin",
                state: "admin-books",
                title: "Books",
                hidden: false,
                unauthenticatedOnly: false,
                requireAuthentication: true
            }
        ];
    }

    getMenuItems(): MenuItem[] {
        return this.menuItems;
    }
}

angular
    .module("app")
    .service("menuService", MenuService);