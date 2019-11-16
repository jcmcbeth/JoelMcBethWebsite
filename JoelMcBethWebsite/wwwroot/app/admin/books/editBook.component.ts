/// <reference path="../../../../client/typings/angularjs/index.d.ts" />
/// <reference path="editbook.controller.ts" />

class EditBookComponent implements ng.IComponentOptions {
    public bindings: any;
    public controller: any;
    public templateUrl: string;

    constructor() {
        this.bindings = {
        };
        this.controller = EditBookController;
        this.templateUrl = "/app/admin/books/editBook.html";
    }
}

angular
    .module("app")
    .component("adminEditBook", new EditBookComponent());