/// <reference path="../../../../client/typings/angularjs/index.d.ts" />
/// <reference path="booklist.controller.ts" />

class BookListComponent implements ng.IComponentOptions {
    public bindings: any;
    public controller: any;
    public templateUrl: string;

    constructor() {
        this.bindings = {
        };
        this.controller = BookListController;
        this.templateUrl = "/app/admin/books/bookList.html";
    }
}

angular
    .module("app")
    .component("adminBookList", new BookListComponent());