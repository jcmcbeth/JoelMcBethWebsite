/// <reference path="../../../client/typings/angularjs/index.d.ts" />

class WindowStickerController {
    static $inject = ['$window'];

    public error: string;
    public vin: any;

    constructor(private $window: ng.IWindowService) {

    }

    public lookup() {
        if (this.vin.manufacturer === "Mitsubishi") {
            // Must be uppercase or it will not match the VIN
            var url = "https://www.mitsubishicars.com/rs/file/monroney?vin=" + this.vin.vin.toUpperCase();
            this.$window.open(url, '_blank');

            this.error = null;
        } else {
            this.error = "That vin is not supported";
        }    
    }
}

angular
    .module('app')
    .controller('WindowStickerController', WindowStickerController);