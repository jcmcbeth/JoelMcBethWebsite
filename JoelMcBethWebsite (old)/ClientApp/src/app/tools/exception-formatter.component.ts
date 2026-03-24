import { Component } from "@angular/core";

@Component({
    selector: 'app-exception-formatter',
    templateUrl: './exception-formatter.component.html'
})
export class ExceptionFormatterComponent {
    public exceptionText: string;
    public formattedException: string;

    constructor() {
    }

    public format() {
        let text = this.exceptionText;

        if (!text) {
            return;
        }

        text = text.replace(/\\r\\n/g, "\n");
        text = text.replace(/\s+at /g, "\n    at ");

        this.formattedException = text;
    }
}
