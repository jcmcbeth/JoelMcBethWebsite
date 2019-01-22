/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="user-registration.ts" />

class AccountService {
    static $inject = ["$http"];

    private static readonly BaseUrl = "/api/account";

    constructor(private readonly http: ng.IHttpService) {
    }

    register(registration: UserRegistration) {
        const url = AccountService.BaseUrl + "/" + "register";

        return this.http.post<void>(url, registration)
            .then(response => {
                return true;
            });
    }
}

angular
    .module("app")
    .service("AccountService", AccountService);