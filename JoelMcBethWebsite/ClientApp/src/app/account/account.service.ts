/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="user-registration.ts" />
/// <reference path="../shared/models/config.ts" />

class AccountService {
    static $inject = ["$http", "config"];

    private baseUrl;

    constructor(private readonly http: ng.IHttpService, config: Config) {
        this.baseUrl = config.serviceUrlBase + "/account";
    }

    register(registration: UserRegistration) {
        const url = this.baseUrl + "/" + "register";

        return this.http.post<void>(url, registration)
            .then(response => {
                return true;
            });
    }
}

angular
    .module("app")
    .service("AccountService", AccountService);