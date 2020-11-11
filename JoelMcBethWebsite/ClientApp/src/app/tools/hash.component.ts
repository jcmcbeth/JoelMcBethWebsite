import { Component, Inject, ViewChild, ElementRef } from "@angular/core";
import { DOCUMENT } from "@angular/common";

class Property {
    name: string;
    value: string;
    include: boolean;
    hash: boolean;
}

@Component({
    selector: "app-hash",
    templateUrl: "./hash.component.html"
})
export class HashComponent {
    algorithm: string;
    algorithms: string[];
    url: string;
    actionUrl: string;
    properties: Property[];
    methods: string[];
    method: string;
    hash: string;
    uppercaseHash: boolean;
    window: Window;
    @ViewChild("submissionForm", { static: false }) submissionForm: ElementRef;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        /*private sce: ng.ISCEService*/) {
        this.window = this.document.defaultView;
        this.algorithms = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
        this.algorithm = this.algorithms[0];
        this.methods = ["POST", "GET"];
        this.method = this.methods[0];
        this.properties = [];
    }

    execute() {
        //this.actionUrl = this.sce.trustAsResourceUrl(this.url);
        this.actionUrl = this.url;


        return this.generate().then(() => {
            this.submissionForm.nativeElement.submit();
        });
    }

    generate() {
        let text = "";

        this.properties
            .filter(p => p.hash)
            .forEach(v => {
                text += v.value;
        });

        const encoder = new TextEncoder();
        const data = encoder.encode(text);

        return this.window.crypto.subtle.digest(this.algorithm, data).then(buffer => {
            let hash = this.getHexString(buffer);

            if (this.uppercaseHash) {
                hash = hash.toUpperCase();
            }

            this.hash = hash;        
        });
    }

    addProperty(): void {
        let property = new Property();

        property.include = true;
        property.hash = true;

        this.properties.push(property);
    }

    deleteProperty(property: Property): void {
        const index = this.properties.indexOf(property);

        this.properties.splice(index, 1);
    }

    private getHexString(buffer: ArrayBuffer): string {
        const bytes = new Uint8Array(buffer);

        let text = "";

        bytes.forEach(value => {
            const hexCode = value.toString(16);
            const paddedHexCode = hexCode.padStart(2, '0');

            text += paddedHexCode;
        });

        return text;
    }
}
