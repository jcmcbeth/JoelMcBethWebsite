/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="consent-prompt.controller.ts" />

class ConsentComponent implements ng.IComponentOptions {
    public bindings;
    public controller;
    public templateUrl: string;
    public css: string;

    constructor() {
        this.bindings = {
        };
        this.controller = ConsentController;
        this.templateUrl = "/app/consent-prompt/consent-prompt.html";
        this.css = "/app/consent-prompt/consent-prompt.css";
    }
}

angular
    .module("app")
    .component("jmConsentPrompt", new ConsentComponent());