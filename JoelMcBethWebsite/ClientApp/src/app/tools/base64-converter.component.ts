import { Component } from "@angular/core";

@Component({
    selector: 'app-base64-converter',
    templateUrl: './base64-converter.component.html'
})
export class Base64ConverterComponent {
    text: string;
    base64: string;

    constructor() {
    }

    convert() {
        this.base64 = btoa(this.text);
    }
}
