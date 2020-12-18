import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
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
        if (route.data.requireAuthentication && !this.authenticationService.isAuthenticated()) {
            this.router.navigate(["/login"]/*, { queryParams: { returnUrl: state.url } } */);

            return false;
        }        

        return true;
    }
}
