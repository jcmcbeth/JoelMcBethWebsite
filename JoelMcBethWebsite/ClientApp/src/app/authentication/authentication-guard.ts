import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { MenuAuthenticationType } from "../menu/menu-authentication-type";
import { AuthenticationService } from "./authentication.service";

@Injectable({
    providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (route.data &&
            route.data.menu &&
            route.data.menu.authentication === MenuAuthenticationType.required &&
            !this.authenticationService.isAuthenticated()) {
            this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });

            return false;
        }        

        return true;
    }
}
