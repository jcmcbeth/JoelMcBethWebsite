/// <reference path="../../../../client/typings/angularjs/index.d.ts" />
/// <reference path="addBook.controller.ts" />

class AddBookComponent implements ng.IComponentOptions {
    public bindings: any;
    public controller: any;
    public templateUrl: string;

    constructor() {
        this.bindings = {
        };
        this.controller = AddBookController;
        this.templateUrl = "/app/admin/books/addBook.html";
    }
}

angular
    .module("app")
    .component("adminAddBook", new AddBookComponent());