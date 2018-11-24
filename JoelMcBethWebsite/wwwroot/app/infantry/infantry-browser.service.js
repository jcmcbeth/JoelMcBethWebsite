(function () {
    angular
        .module("app")
        .factory("infantryBrowserService", infantryBrowserService);

    infantryBrowserService.$inject = ["$http"];

    function infantryBrowserService($http) {
        var baseUrl = "/api/infantry/browser/";

        return {
            getZones: getZones
        };

        function getZones() {
            var url = baseUrl + "zones";
            return $http.get(url).then(getZonesComplete);

            function getZonesComplete(response) {
                return response.data;
            }
        }
    }
})();