/// <reference path="../../../client/typings/angularjs/index.d.ts" />

class MenuController implements ng.IOnInit {
    static $inject = ["menuService", "$rootScope", "AuthenticationService"];

    public menuItems: any[];
    public menuGroups: any[];

    private authenticated;

    constructor(private menuService, private rootScope: ng.IRootScopeService, private authenticationService) {
        this.menuItems = [];
        this.menuGroups = [];
        this.authenticated = false;

        rootScope.$on("authenticated", () => {
            this.authenticated = true;

            this.updateMenuItems();
        });

        rootScope.$on("unauthenticated", () => {
            this.authenticated = false;

            this.updateMenuItems();
        });
    }

    $onInit(): void {
        this.menuItems = this.menuService.getMenuItems();
        this.menuGroups = this.getMenuGroups();

        this.authenticated = this.authenticationService.isAuthenticated();

        this.updateMenuItems();
    }

    private getMenuGroups() {
        var groups = [];

        for (var i = 0; i < this.menuItems.length; i++) {
            var menuItem = this.menuItems[i];
            var groupName = menuItem.group;

            var group = groups.find((currentGroup) => {
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

    private updateMenuItems(): void {
        for (var i = 0; i < this.menuItems.length; i++) {
            var item = this.menuItems[i];

            if (item.hidden) {
                item.visible = false;
                continue;
            }

            if (item.unauthenticatedOnly && this.authenticated) {
                item.visible = false;
                continue;
            }

            if (item.requireAuthentication && !this.authenticated) {
                item.visible = false;
                continue;
            }

            item.visible = true;
        }

        for (i = 0; i < this.menuGroups.length; i++) {
            var group = this.menuGroups[i];

            var visible = group.menuItems.some((item) => {
                return item.visible === true;
            });

            group.visible = visible;
        }
    }
}

angular
    .module("app")
    .controller("MenuController", MenuController);