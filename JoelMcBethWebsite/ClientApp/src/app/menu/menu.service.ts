import { MenuItem } from "./menu-item";
import { Injectable } from "@angular/core";
import { Route, Router } from "@angular/router";
import { MenuAuthenticationType } from "./menu-authentication-type";
import { MenuGroup } from "./menu-group";

@Injectable({
  providedIn: 'root',
})
export class MenuService {
    public menuItems: MenuItem[];

    constructor(router: Router) {        
        this.menuItems = this.createMenuItems(router.config);
    }

    getMenuItems(): MenuItem[] {
        return this.menuItems;
    }

    private createMenuItems(routes: Route[]): MenuItem[] {
        return routes.map((route, index) => {
            var item = new MenuItem();

            item.path = route.path;

            if (route.data && route.data.menu) {
                item.visible = route.data.menu.visible || false;
                item.group = route.data.menu.group || "";                
                item.title = route.data.menu.title || "";
                item.order = route.data.menu.order || Number.MAX_VALUE;

                item.authentication = route.data.menu.authentication;
                if (item.authentication == null) {
                    item.authentication = MenuAuthenticationType.none;
                }
            }

            return item;
        });
    }


}
