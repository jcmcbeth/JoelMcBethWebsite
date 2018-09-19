(function () {
    "use strict";

    angular
        .module("app")
        .controller("MediaController", MediaController);

    MediaController.$inject = [];

    function MediaController() {
        /* jshint validthis:true */
        var vm = this;

        activate();

        function activate() { }
    }
})();
