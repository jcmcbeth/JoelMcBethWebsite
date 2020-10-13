/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="consent.service.ts" />

class ConsentController {
    static $inject = ["ConsentService"];

    public message: string;

    constructor(private consentService: ConsentService) {
        this.message = "This site does not use cookies or save personal information. Just wanted to be as annoying as everyone else.";
    }

    accept() {
        this.consentService.setConsentStatus(ConsentStatus.Consented);
    }

    decline() {
        this.consentService.setConsentStatus(ConsentStatus.Declined);
    }

    showConsentPrompt(): boolean {
        return this.consentService.getConsentStatus() === ConsentStatus.None;
    }
}

angular
    .module("app")
    .controller("ConsentController", ConsentController);