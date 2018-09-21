(function () {
    "use strict";

    angular
        .module("app")
        .controller("MediaController", MediaController);

    MediaController.$inject = ["mediaService"];

    function MediaController(mediaService) {
        /* jshint validthis:true */
        var vm = this;
        vm.search = search;

        function search() {
            updateMedia();
        }

        activate();

        function updateMedia() {
            return mediaService.getMedia(vm.filterText).then(function (data) {
                vm.media = data.media;
            });
        }

        function activate() {
            updateMedia();
        }
    }
})();
