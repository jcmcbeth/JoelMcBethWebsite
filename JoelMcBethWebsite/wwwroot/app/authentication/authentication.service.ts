/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="token.service.ts" />
/// <reference path="authentication-response.ts" />
/// <reference path="authentication-result.ts" />

class AuthenticationService {
    static $inject = ["$http", "$q", "$rootScope", "TokenService"];

    readonly baseUrl = "/api/account";

    constructor(
        private readonly http: ng.IHttpService,
        private readonly q: ng.IQService,
        private readonly rootScope: ng.IRootScopeService,
        private readonly tokenService: TokenService) {
    }

    isAuthenticated(): boolean {
        let token = this.tokenService.getToken();

        if (token) {
            return true;
        }

        return false;
    }

    logout(): ng.IPromise<void> {
        this.tokenService.clearToken();
        this.rootScope.$broadcast("unauthenticated");

        return this.q.when();
    }

    login(userName: string, password: string) {
        let url = this.baseUrl + "/authenticate?userName=" + userName + "&password=" + password;

        return this.http<AuthenticationResponse>({
            url: url,
            method: "POST"
        }).then(response => {
            if (response.data.result === AuthenticationResult.Success) {
                const token = response.data.token;

                this.tokenService.setToken(token);

                this.rootScope.$broadcast("authenticated");
            }

            return response.data.result;
        });
    }
}

angular
    .module("app")
    .service("AuthenticationService", AuthenticationService);