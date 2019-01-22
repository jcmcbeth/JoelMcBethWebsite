/// <reference path="../../../client/typings/angularjs/index.d.ts" />

class TokenService {
    static $inject = ["$window"];

    constructor(private readonly window: ng.IWindowService) {
    }

    getToken(): string {
        return this.window.sessionStorage.getItem("token");
    }

    setToken(token: string) {
        this.window.sessionStorage.setItem("token", token);
    }

    clearToken(): void {
        this.window.sessionStorage.removeItem("token");
    }
}

angular
    .module("app")
    .service("TokenService", TokenService);