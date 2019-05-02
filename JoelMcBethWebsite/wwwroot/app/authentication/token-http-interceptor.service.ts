/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="token.service.ts" />
/// <reference path="authentication.service.ts" />

class TokenHttpInterceptor implements ng.IHttpInterceptor {
    static $inject = ["TokenService", "$rootScope", "$state"];

    constructor(
        private readonly tokenService: TokenService,
        private readonly rootScope: ng.IRootScopeService,
        private readonly state) {
    }

    request = (config: ng.IRequestConfig) => {
        const token = this.tokenService.getToken();

        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }

        return config;
    }    

    responseError = (response: ng.IHttpResponse<any>) => {
        if (response.status === 401) {
            const token = this.tokenService.getToken();

            if (token) {
                this.tokenService.clearToken();
                this.rootScope.$broadcast("unauthenticated");
            }

            this.state.go("login");
        }

        return response;
    }
}

angular
    .module("app")
    .service("TokenHttpInterceptor", TokenHttpInterceptor);