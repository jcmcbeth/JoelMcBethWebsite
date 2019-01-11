﻿/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="../services/authentication.service.ts" />
/// <reference path="../shared/models/paged-array.ts" />
/// <reference path="user.ts" />

class UserService {
    static $inject = ["$http", "authenticationService"];

    constructor(private http: ng.IHttpService, private authenticationService: AuthenticationService) {
    }

    getUsers(page: number, pageSize: number) {
        return this.http.get<PagedArray<User>>("/api/users", {
            params: {
                page: page,
                pageSize: pageSize
            },
            headers: {
                Authorization: this.authenticationService.getToken()
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
}

angular
    .module("app")
    .service('userService', UserService);