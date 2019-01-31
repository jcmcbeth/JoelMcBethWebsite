/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="../authentication/authentication.service.ts" />
/// <reference path="../shared/models/paged-array.ts" />
/// <reference path="user.ts" />

class UserService {
    static $inject = ["$http", "AuthenticationService"];

    constructor(private http: ng.IHttpService, private authenticationService: AuthenticationService) {
    }

    getUsers(page: number, pageSize: number) {
        return this.http.get<PagedArray<User>>("/api/users", {
            params: {
                page: page,
                pageSize: pageSize
            }
        }).then(response => {
            return response.data;
        });
    }

    addUser(user) {
        return this.http.post("/api/users", user)
            .then(response => {
                return response.data;
            });
    }

    approval(id: number, approved: boolean): ng.IPromise<void> {
        const url = "/api/users/" + id + "/approval/" + approved;

        return this.http.patch<void>(url, null)
            .then(response => {
            });
    }
}

angular
    .module("app")
    .service('userService', UserService);