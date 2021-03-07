import { ConsentStatus } from "./consent-status";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class ConsentService {
    private static readonly ConsentPropertyName = "consentStatus";

    constructor() {
    }

    getConsentStatus(): ConsentStatus {
        const stringValue = localStorage.getItem(ConsentService.ConsentPropertyName);

        if (stringValue === null) {
            return ConsentStatus.None;
        }

        return parseInt(stringValue);
    }

    setConsentStatus(status: ConsentStatus) {
        localStorage.setItem(ConsentService.ConsentPropertyName, status.toString());
    }

    clearConsentStatus() {
        localStorage.removeItem(ConsentService.ConsentPropertyName);
    }
}
