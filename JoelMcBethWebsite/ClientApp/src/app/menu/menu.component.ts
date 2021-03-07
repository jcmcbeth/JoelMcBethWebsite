import { MenuService } from "./menu.service";
import { Component, OnInit } from "@angular/core";
import { MenuItem } from "./menu-item";
import { AuthenticationService } from "../authentication/authentication.service";
import { MenuAuthenticationType } from "./menu-authentication-type";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    host: {
        "class": "navbar navbar-expand-md d-md-block col-md-2 col-lg-1"
    }
})
export class MenuComponent implements OnInit {
    public items: MenuItem[];
    public groups: MenuGroupViewModel[];

    private authenticated;

    constructor(
        private readonly menuService: MenuService,
        private readonly authenticationService: AuthenticationService) {
        this.items = [];
        this.groups = [];
        this.authenticated = false;
    }

    ngOnInit(): void {
        this.items = this.menuService.getMenuItems();

        this.authenticationService.authenticated.subscribe(authenticated => {
            this.authenticated = authenticated;

            this.groups = this.getMenuGroups();
        });                
    }

    private getMenuGroups(): MenuGroupViewModel[] {
        var groups: MenuGroupViewModel[] = [];

        for (let i = 0; i < this.items.length; i++) {
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

        for (let i = 0; i < groups.length; i++) {
            const group = groups[i];

            group.items.sort((a, b) => {
                return a.order - b.order;
            });
        }

        return groups;
    }

    private isMenuItemVisible(item: MenuItem): boolean {
        if (!item.visible) {
            return false;
        }

        if (item.authentication === MenuAuthenticationType.required && !this.authenticated) {
            return false;
        }

        if (item.authentication === MenuAuthenticationType.unauthenticated && this.authenticated) {
            return false;
        }

        return true;
    }
}

class MenuGroupViewModel {
    name: string;
    items: MenuItem[];
}
