import { MenuItem } from "./menu-item";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class MenuService {
    public menuItems: MenuItem[];

    constructor() {
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
                hidden: true,
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
                hidden: true,
                unauthenticatedOnly: false,
                requireAuthentication: false
            },
            {
                group: "Main",
                state: "cameras",
                title: "Cameras",
                hidden: true,
                unauthenticatedOnly: false,
                requireAuthentication: true
            },
            {
                group: "Account",
                state: "login",
                title: "Login",
                hidden: true,
                unauthenticatedOnly: true,
                requireAuthentication: false
            },
            {
                group: "Account",
                state: "logout",
                title: "Logout",
                hidden: true,
                unauthenticatedOnly: false,
                requireAuthentication: true
            },
            {
                group: "Users",
                state: "users",
                title: "User List",
                hidden: true,
                unauthenticatedOnly: false,
                requireAuthentication: true
            },
            {
                group: "Admin",
                state: "admin-books",
                title: "Books",
                hidden: true,
                unauthenticatedOnly: false,
                requireAuthentication: true
            }
        ];
    }

    getMenuItems(): MenuItem[] {
        return this.menuItems;
    }
}
