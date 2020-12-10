/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="../authentication/authentication.service.ts" />
/// <reference path="../shared/models/paged-array.ts" />
/// <reference path="user.ts" />
/// <reference path="../shared/models/config.ts" />

class UserService {
    static $inject = ["$http", "AuthenticationService", "config"];

    private baseUrl: string;

    constructor(
        private http: ng.IHttpService,
        private authenticationService: AuthenticationService,
        config: Config
    ) {
        this.baseUrl = config.serviceUrlBase + "/users";
    }

    getUsers(page: number, pageSize: number) {
        return this.http.get<PagedArray<User>>(this.baseUrl, {
            params: {
                page: page,
                pageSize: pageSize
            }
        }).then(response => {
            return response.data;
        });
    }

    addUser(user) {
        return this.http.post(this.baseUrl, user)
            .then(response => {
                return response.data;
            });
    }

    approval(id: number, approved: boolean): ng.IPromise<void> {
        const url = this.baseUrl + "/" + id + "/approval/" + approved;

        return this.http.patch<void>(url, null)
            .then(response => {
            });
    }
}

angular
    .module("app")
    .service('userService', UserService);