/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="../authentication/authentication.service.ts" />
/// <reference path="../authentication/authentication-result.ts" />

class LoginController {
    static $inject = ["AuthenticationService", "$state"];

    public error: string;
    public username: string;
    public password: string;

    constructor(
        private authenticationService: AuthenticationService,
        private $state) {
    }

    login() {
        this.error = null;

        this.authenticationService.login(this.username, this.password)
            .then(result => {
                if (result === AuthenticationResult.Success) {
                    this.$state.go("home")

                    return;
                }

                let message;

                if (result === AuthenticationResult.Locked) {
                    message = "Login failed. Your user is locked.";
                } else if (result === AuthenticationResult.Unapproved) {
                    message = "Login failed. Your user has not been approved for access.";
                } else if (result === AuthenticationResult.InvalidCredentials) {
                    message = "Login failed. Your credentials were invalid.";
                } else {
                    message = "Login failed.";
                }

                this.error = message;
                this.password = "";
            },
            error => {
                this.error = error
                this.username = "";
                this.password = "";
            });
    }
}

angular
    .module("app")
    .controller("LoginController", LoginController);
