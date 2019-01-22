/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="token.service.ts" />

class TokenHttpInterceptor implements ng.IHttpInterceptor {
    static $inject = ["TokenService"];

    constructor(private readonly tokenService: TokenService) {
    }

    request = (config: ng.IRequestConfig) => {
        const token = this.tokenService.getToken();

        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }

        return config;
    }
}

angular
    .module("app")
    .service("TokenHttpInterceptor", TokenHttpInterceptor);