(function () {
    "use strict";

    angular
        .module("app")
        .factory("menuService", menuService);

    menu.$inject = ["$http"];

    function menu($http) {
        var service = {
            getData: getData
        };

        return service;

        function getData() { }
    }
})();