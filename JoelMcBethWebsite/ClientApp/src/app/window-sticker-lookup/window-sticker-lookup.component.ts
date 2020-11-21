import { Inject, Component } from "@angular/core";

@Component({
    selector: 'app-window-sticker-lookup',
    templateUrl: './window-sticker-lookup.component.html'
})
export class WindowStickerLookupComponent {
    private manufacturers = {
        "JA3": "Mitsubishi",
        "JA4": "Mitsubishi",
        "JMY": "Mitsubishi Motors",
        "JMB": "Mitsubishi Motors"
    };

    public error: string;
    public vin: string;

    constructor(@Inject("Window")private window: Window) {

    }

    public lookup() {
        var uppercaseVin = this.vin.toUpperCase();
        var manufacturerIdentifier = uppercaseVin.substring(0, 3);

        var value = {
            vin: uppercaseVin,
            manufacturerIdentifier: manufacturerIdentifier,
            manufacturer: this.manufacturers[manufacturerIdentifier],
            vehicleDescription: uppercaseVin.substring(3, 9),
            vehicleIdentifier: uppercaseVin.substring(9, 17)
        };

        if (value.manufacturer === "Mitsubishi") {
            // Must be uppercase or it will not match the VIN
            var url = "https://www.mitsubishicars.com/rs/file/monroney?vin=" + value.vin;
            this.window.open(url, '_blank');

            this.error = null;
        } else {
            this.error = "That vin is not supported";
        }    
    }
}
