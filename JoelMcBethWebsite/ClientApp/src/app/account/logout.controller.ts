/// <reference path="../../../client/typings/angularjs/index.d.ts" />

class LogoutController implements ng.IOnInit {
    static $inject = ["AuthenticationService"];

    public message: string;

    constructor(private authenticationService) {
        this.message = "You are being logged out.";
    }

    $onInit() {
        this.authenticationService.logout()
            .then(function () {
                this.message = "You have been logged out!";
            });
    }
}

angular
    .module("app")
    .controller("LogoutController", LogoutController);