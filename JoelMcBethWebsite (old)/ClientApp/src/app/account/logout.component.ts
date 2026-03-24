import { OnInit, Component } from "@angular/core";
import { AuthenticationService } from "../authentication/authentication.service";

@Component({
    selector: "app-logout",
    templateUrl: "./logout.component.html"
})
export class LogoutComponent implements OnInit {
    public message: string;

    constructor(private authenticationService: AuthenticationService) {
        this.message = "You are being logged out.";
    }

    ngOnInit(): void {
        this.authenticationService.logout()
            .subscribe(() => {
                this.message = "You have been logged out!";
            });
    }
}
