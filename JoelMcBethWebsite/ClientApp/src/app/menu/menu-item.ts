import { MenuAuthenticationType } from "./menu-authentication-type";

export class MenuItem {
    group: string;
    path: string;
    title: string;
    visible: boolean;
    authentication: MenuAuthenticationType;
    order: number;
}
