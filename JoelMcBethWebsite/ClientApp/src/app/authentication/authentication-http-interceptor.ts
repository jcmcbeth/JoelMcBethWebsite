import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthenticationService } from "./authentication.service";

@Injectable({
    providedIn: 'root',
})
export class AuthenticationHttpInterceptor implements HttpInterceptor {

    constructor(
        private readonly authenticationService: AuthenticationService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request = req;

        if (this.authenticationService.isAuthenticated()) {
            const token = this.authenticationService.getAuthenticationToken();

            if (token) {
                request = req.clone({
                    headers: req.headers.set("Authorization", "Bearer " + token)
                });
            }                            
        }

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    if (this.authenticationService.isAuthenticated()) {
                        this.authenticationService.logout();
                    }

                    location.reload(true);
                }

                return throwError(error);
            })
        );
    }  
}
