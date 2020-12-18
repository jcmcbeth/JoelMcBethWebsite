import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "./user";
import { UserService } from "./user.service";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
    page: number;
    pageSize: number;
    pageCount: number;
    users: User[];

    constructor(private readonly userService: UserService) {
        this.page = 1;
        this.pageSize = 15;
    }

    ngOnInit(): void {
        this.updateUsers();
    }

    updateUsers() {
        return this.userService.getUsers(this.page, this.pageSize).pipe(
            tap(users => {
                this.users = users.items;
                this.pageCount = users.pagination.count;
            })
            // TODO: figure out how to return a void observable to indcate the update is complete
        );
    }

    approve(user: User): Observable<void> {
        return this.userService.approval(user.id, !user.isApproved).pipe(
            tap(() => {
                user.isApproved = !user.isApproved;
            })            
        );
    }
}
