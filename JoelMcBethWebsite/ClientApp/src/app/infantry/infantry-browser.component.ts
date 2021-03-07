import { InfantryBrowserService } from "./infantry-browser.service";
import { Zone } from "./zone";
import { OnInit, Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: 'app-infantry-browser',
    templateUrl: './infantry-browser.component.html',
})
export class InfantryBrowserComponent implements OnInit {
    public zones: Zone[];

    constructor(
        private infantryBrowserService: InfantryBrowserService,
        private sanitizer: DomSanitizer
    ) {
        this.zones = [];
    }

    ngOnInit(): void {
        this.infantryBrowserService.getZones().subscribe(zones => this.zones = zones);
    }

    public getUrl(zone: Zone) {
        return this.sanitizer.bypassSecurityTrustUrl(`infantry://${zone.serverAddress}:${zone.serverPort}`);
    }
}
