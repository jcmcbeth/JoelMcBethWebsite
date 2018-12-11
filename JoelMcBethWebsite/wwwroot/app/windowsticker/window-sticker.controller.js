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
            var url = "https://www.mitsubishicars.com/rs/file/monroney?vin=" + vm.vin;
            $window.open(url, '_blank');
        }

        function activate() { }
    }
})();
