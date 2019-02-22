/// <reference path="../../../client/typings/angularjs/index.d.ts" />

class Base64Controller {
    text: string;
    base64: string;

    constructor() {
    }

    convert() {
        this.base64 = btoa(this.text);
    }
}

angular
    .module("app")
    .controller("Base64Controller", Base64Controller);