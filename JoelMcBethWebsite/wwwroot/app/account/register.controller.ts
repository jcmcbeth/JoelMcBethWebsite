/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="account.service.ts" />
/// <reference path="user-registration.ts" />

class RegisterController {
    static $inject = ["AccountService", "$state"];

    public error: string;
    public registration: UserRegistration;
    public repeatPassword: string;

    constructor(private readonly accountService: AccountService, private readonly $state) {
        this.registration = new UserRegistration();
    }

    register() {
        this.error = "";

        this.registration.userName = this.registration.email;

        this.accountService.register(this.registration).then(() => {
            this.$state.go("login");
        }).catch(reason => {
            this.error = "A server error occurred.";
        });
    }
}

angular
    .module("app")
    .controller("RegisterController", RegisterController);
