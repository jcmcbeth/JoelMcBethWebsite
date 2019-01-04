/// <reference path="../../../client/typings/angularjs/index.d.ts" />

class AuthenticationService {
    static $inject = ["$http", "$window", "$q", "$rootScope"];

    readonly baseUrl = "/api/account";

    constructor(private http: ng.IHttpService, private window: ng.IWindowService, private q: ng.IQService, private rootScope: ng.IRootScopeService) {

    }

    isAuthenticated(): boolean {
        let token = this.getToken();

        if (token) {
            return true;
        }

        return false;
    }

    getToken(): string {
        return this.window.sessionStorage.getItem("token");
    }

    logout(): ng.IPromise<void> {
        this.window.sessionStorage.removeItem("token");
        this.rootScope.$broadcast("unauthenticated");

        return this.q.when();
    }

    login(userName: string, password: string) {
        let deferred = this.q.defer();
        let url = this.baseUrl + "/login?userName=" + userName + "&password=" + password;

        this.http<any>({
            url: url,
            method: "POST"
        }).then(response => {
            if (response.data.success === true) {
                let token = response.data.token;

                this.window.sessionStorage.setItem("token", token);

                this.rootScope.$broadcast("authenticated");

                deferred.resolve();
            }

            deferred.reject("Invalid credentials.");
        }, () => {
            deferred.reject("An error occurred when attempting to login.");
        });

        function onSuccess(response) {
            if (response.data.success === true) {
                let token = response.data.token;

                this.window.sessionStorage.setItem("token", token);

                this.rootScope.$broadcast("authenticated");

                deferred.resolve();
            }

            deferred.reject("Invalid credentials.");
        }

        function onError(response) {
            deferred.reject("An error occurred when attempting to login.");
        }

        return deferred.promise;
    }
}

angular
    .module("app")
    .service("authenticationService", AuthenticationService);