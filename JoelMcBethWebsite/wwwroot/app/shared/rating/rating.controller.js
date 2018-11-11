(function () {
    "use strict";

    angular
        .module("app")
        .controller("RatingController", RatingController);

    RatingController.$inject = ["$scope"];

    function RatingController($scope) {
        /* jshint validthis:true */
        var vm = this;

        vm.stars = [1, 2, 3, 4, 5];

        vm.hasRating = hasRating;

        function hasRating(rating) {
            return $scope.value >= rating;
        }
    }
})();
