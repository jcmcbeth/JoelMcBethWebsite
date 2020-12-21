import { UserRegistration } from "./user-registration";
import { AccountService } from "./account.service";
import { Router } from "@angular/router";
import { Component } from "@angular/core";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html"
})
export class RegisterComponent {
    public error: string;
    public registration: UserRegistration;
    public repeatPassword: string;

    constructor(private readonly accountService: AccountService, private readonly router: Router) {
        this.registration = new UserRegistration();
    }

    register() {
        this.error = "";

        this.registration.userName = this.registration.email;

        this.accountService.register(this.registration).subscribe(success => {
            if (success) {
                this.router.navigate(["/login"]);
            }
            else {
                this.error = "Registration failed.";
            }
        }, error => {
            this.error = "A server error occurred";
        });
    }
}
