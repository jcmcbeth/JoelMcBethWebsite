/// <reference path="../../../client/typings/angularjs/index.d.ts" />

class InfantryBrowserController implements ng.IOnInit {
    static $inject = ["InfantryBrowserService"];

    public zones: Zone[];

    constructor(private infantryBrowserService: InfantryBrowserService) {
        this.zones = [];
    }

    $onInit() {
        this.infantryBrowserService.getZones().then(zones => {
            this.zones = zones;
        });
    }
    
}

angular
    .module("app")
    .controller("InfantryBrowserController", InfantryBrowserController);
    