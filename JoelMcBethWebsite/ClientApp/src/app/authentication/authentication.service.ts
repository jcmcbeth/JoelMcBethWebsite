import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { AuthenticationResponse } from "./authentication-response";
import { AuthenticationResult } from "./authentication-result";
import { TokenService } from "./token.service";
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

    private baseUrl;

    constructor(
        private readonly httpClient: HttpClient,
        @Inject("API_URL") baseUrl: string,
        private readonly tokenService: TokenService) {
        this.baseUrl = baseUrl + "/account";
    }

    isAuthenticated(): boolean {
        let token = this.tokenService.getToken();

        if (token) {
            return true;
        }

        return false;
    }

    logout(): Observable<void> {
        this.tokenService.clearToken();
        //this.rootScope.$broadcast("unauthenticated");

        return of();
    }

    login(userName: string, password: string): Observable<AuthenticationResult> {
        let url = this.baseUrl + "/authenticate?userName=" + userName + "&password=" + password;

        return this.httpClient.post<AuthenticationResponse>(url, null)
            .pipe(
                tap(response => {
                    if (response.result === AuthenticationResult.Success) {
                        const token = response.token;

                        this.tokenService.setToken(token);
                        // this.rootScope.$broadcast("authenticated");
                    }
                }),
                map(response => response.result)
            );
    }

    getAuthenticationToken(): string {
        return this.tokenService.getToken();
    }
}
