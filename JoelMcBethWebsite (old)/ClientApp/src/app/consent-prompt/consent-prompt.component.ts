import { Component } from "@angular/core";
import { ConsentService } from "./consent.service";
import { ConsentStatus } from "./consent-status";

// TODO: Add animation
@Component({
    selector: 'app-consent-prompt',
    templateUrl: './consent-prompt.component.html',
    styleUrls: ['./consent-prompt.component.css']
})
export class ConsentPromptComponent {
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
