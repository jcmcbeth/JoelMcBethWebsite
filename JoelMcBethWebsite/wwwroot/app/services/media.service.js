(function () {
    "use strict";

    angular
        .module("app")
        .factory("mediaService", factory);

    factory.$inject = ["$http"];

    function factory($http) {
        var baseUrl = "/api/media";

        return {
            getMedia: getMedia
        };

        function getMedia(filter) {
            return $http.get(baseUrl, {
                params: {
                    filter: filter
                }
            }).then(getMediaComplete);

            function getMediaComplete(response) {
                return {
                    media: response.data.data
                };
            }
        }
    }
})();