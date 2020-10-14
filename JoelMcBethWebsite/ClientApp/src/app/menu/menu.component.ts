import { MenuService } from "./menu.service";
import { Component, OnInit } from "@angular/core";
import { MenuItem } from "./menu-item";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    host: {
        "class": "navbar navbar-expand-md d-md-block col-md-2 col-lg-1"
    }
})
export class MenuComponent implements OnInit {
    //static $inject = ["menuService", "$rootScope", "AuthenticationService"];

    public items: MenuItem[];
    public groups: MenuGroupViewModel[];

    private authenticated;

    constructor(private menuService: MenuService/*, private rootScope: ng.IRootScopeService, private authenticationService*/) {
        this.items = [];
        this.groups = [];
        this.authenticated = false;

        //rootScope.$on("authenticated", () => {
        //    this.authenticated = true;

        //    this.updateMenuItems();
        //});

        //rootScope.$on("unauthenticated", () => {
        //    this.authenticated = false;

        //    this.updateMenuItems();
        //});
    }

    ngOnInit(): void {
        //this.authenticated = this.authenticationService.isAuthenticated();

        this.items = this.menuService.getMenuItems();
        this.groups = this.getMenuGroups();
    }

    private getMenuGroups(): MenuGroupViewModel[] {
        var groups: MenuGroupViewModel[] = [];

        for (var i = 0; i < this.items.length; i++) {
            const menuItem = this.items[i];

            if (!this.isMenuItemVisible(menuItem)) {
                continue;
            }

            const groupName = menuItem.group;
            let group = groups.find((currentGroup) => {
                return currentGroup.name === groupName;
            });

            if (group === undefined) {
                group = {
                    name: groupName,
                    items: []
                };

                groups.push(group);
            }

            group.items.push(menuItem);
        }

        return groups;
    }

    private isMenuItemVisible(item: MenuItem): boolean {
        if (item.hidden) {
            return false;
        }

        if (item.requireAuthentication && !this.authenticated) {
            return false;
        }

        if (item.unauthenticatedOnly && this.authenticated) {
            return false;
        }

        return true;
    }
}

class MenuGroupViewModel {
    name: string;
    items: MenuItem[];
}
