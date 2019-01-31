/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="user.service.ts" />

class UsersController implements ng.IOnInit {
    static $inject = ["userService"];

    page: number;
    pageSize: number;
    pageCount: number;
    users: User[];

    constructor(private userService: UserService) {
        this.page = 1;
        this.pageSize = 15;
    }

    updateUsers() {
        this.userService.getUsers(this.page, this.pageSize).then(users => {
            this.users = users.items;
            this.pageCount = users.pagination.count;
        });
    }

    approve(user: User) {
        this.userService.approval(user.id, !user.isApproved).then(() => {
            user.isApproved = !user.isApproved;
        });
    }

    $onInit(): void {
        this.updateUsers();
    }
}

angular
    .module("app")
    .controller("UsersController", UsersController);