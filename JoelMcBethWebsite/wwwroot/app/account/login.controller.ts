/// <reference path="../../../client/typings/angularjs/index.d.ts" />

class LoginController {
    static $inject = ["authenticationService", "$state"];

    public error: string;
    public username: string;
    public password: string;

    constructor(private authenticationService, private $state) {

    }

    login() {
        this.error = null;

        this.authenticationService.login(this.username, this.password)
            .then(() => this.$state.go("home"),
            error => this.error = error);
    }
}

angular
    .module("app")
    .controller("LoginController", LoginController);
