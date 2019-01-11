/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="../../../client/typings/angular-ui-router/index.d.ts" />
/// <reference path="user.service.ts" />

class AddUserController {
    static $inject = ["userService", "$state"];

    user: User;

    constructor(private userService: UserService, private state) {
        this.user = new User();
    }

    addUser() {
        this.user.userName = this.user.email;

        this.userService.addUser(this.user)
            .then(response => {
                this.state.go("users");
            });
    }
}

angular
    .module("app")
    .controller("AddUserController", AddUserController);