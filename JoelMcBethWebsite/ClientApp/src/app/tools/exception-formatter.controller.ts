/// <reference path="../../../client/typings/angularjs/index.d.ts" />

class ExceptionFormatterController {
    public exceptionText: string;
    public formattedException: string;

    constructor() {

    }

    public format() {
        let text = this.exceptionText;

        if (!text) {
            return;
        }

        text = text.replace(/\\r\\n/g, "\n");
        text = text.replace(/\s+at /g, "\n    at ");

        this.formattedException = text;
    }
}

angular
    .module("app")
    .controller("ExceptionFormatterController", ExceptionFormatterController);