/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="consent-status.ts" />

class ConsentService {
    private static readonly ConsentPropertyName = "consentStatus";
    static $inject = ["$window"];

    constructor(private window: ng.IWindowService) {
    }

    getConsentStatus(): ConsentStatus {
        const stringValue = this.window.localStorage.getItem(ConsentService.ConsentPropertyName);

        if (stringValue === null) {
            return ConsentStatus.None;
        }

        return parseInt(stringValue);
    }

    setConsentStatus(status: ConsentStatus) {
        this.window.localStorage.setItem(ConsentService.ConsentPropertyName, status.toString());
    }

    clearConsentStatus() {
        this.window.localStorage.removeItem(ConsentService.ConsentPropertyName);
    }
}

angular
    .module("app")
    .service("ConsentService", ConsentService);