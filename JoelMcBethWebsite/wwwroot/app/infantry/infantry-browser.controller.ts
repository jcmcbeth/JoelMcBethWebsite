/// <reference path="../../../client/typings/angularjs/index.d.ts" />

(function () {
    "use strict";

    angular
        .module("app")
        .controller("InfantryBrowserController", MediaController);

    MediaController.$inject = ["infantryBrowserService"];

    function MediaController(infantryBrowserService) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        function activate() {
            infantryBrowserService.getZones().then(zones => {
                vm.zones = zones;
            });
        }
    }
})();
