import { Component } from "@angular/core";
import { AuthenticationService } from "../authentication/authentication.service";
import { Router } from "@angular/router";
import { AuthenticationResult } from "../authentication/authentication-result";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html"
})
export class LoginComponent {
    public error: string;
    public username: string;
    public password: string;

    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly router: Router) {
    }

    login() {
        this.error = null;

        this.authenticationService.login(this.username, this.password)
            .subscribe(result => {
                if (result === AuthenticationResult.Success) {
                    this.router.navigate(["/"]);

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
                this.error = "A server error occurred.";
                this.username = "";
                this.password = "";
            });
    }
}
