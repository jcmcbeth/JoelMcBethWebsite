(function () {
    "use strict";

    angular
        .module("app")
        .directive("rating", rating);

    rating.$inject = [];

    function rating() {
        var component = {
            scope: {
                value: "<"
            },
            restrict: "E",
            controller: "RatingController as $ctrl",
            link: link,
            templateUrl: "/app/shared/rating/rating.html",
            css: "/app/shared/rating/rating.css"
        };

        function link(scope, element, attrs) {
        }

        return component;
    }
})();