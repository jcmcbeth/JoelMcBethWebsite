/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="consent.controller.ts" />

class ConsentComponent implements ng.IComponentOptions {
    public bindings: any;
    public controller: any;
    public templateUrl: string;

    constructor() {
        this.bindings = {
        };
        this.controller = ConsentController;
        this.templateUrl = "/app/consent/consent.html";
    }
}

angular
    .module("app")
    .component("jmConsent", new ConsentComponent());