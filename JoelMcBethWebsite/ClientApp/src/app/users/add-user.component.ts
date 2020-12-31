import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "./user";
import { UserService } from "./user.service";

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
})
export class AddUserComponent {
    user: User;

    constructor(private userService: UserService, private router: Router) {
        this.user = new User();
    }

    addUser() {
        this.user.userName = this.user.email;

        return this.userService.addUser(this.user)
            .subscribe(response => {
                this.router.navigate(["/users"]);
            });
    }
}
