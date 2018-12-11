(function () {
    'use strict';

    angular
        .module('app')
        .controller('WindowStickerController', WindowStickerController);

    WindowStickerController.$inject = ["$window"];

    function WindowStickerController($window) {
        /* jshint validthis:true */
        var vm = this;

        vm.lookup = lookup;

        activate();

        function lookup() {
            if (vm.vin.manufacturer === "Mitsubishi") {
                var url = "https://www.mitsubishicars.com/rs/file/monroney?vin=" + vm.vin.vin;
                $window.open(url, '_blank');

                vm.error = null;
            } else {
                vm.error = "That vin is not supported";
            }          
        }

        function activate() { }
    }
})();
