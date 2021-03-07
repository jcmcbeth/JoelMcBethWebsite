import { Inject, Injectable } from "@angular/core";

const TokenKey: string = "token";

@Injectable({
    providedIn: 'root',
})
export class TokenService {    
    constructor(@Inject("Window") private readonly window: Window) {
    }

    getToken(): string {
        return this.window.sessionStorage.getItem(TokenKey);
    }

    setToken(token: string) {
        this.window.sessionStorage.setItem(TokenKey, token);
    }

    clearToken(): void {
        this.window.sessionStorage.removeItem(TokenKey);
    }
}
