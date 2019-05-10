/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="exception-formatter.controller.ts" />

class ExceptionFormatterComponent implements ng.IComponentOptions {
    public bindings: any;
    public controller: any;
    public templateUrl: string;

    constructor() {
        this.bindings = {
        };
        this.controller = ExceptionFormatterController;
        this.templateUrl = "/app/tools/exception-formatter.html";
    }
}

angular
    .module("app")
    .component("exceptionFormatter", new ExceptionFormatterComponent());