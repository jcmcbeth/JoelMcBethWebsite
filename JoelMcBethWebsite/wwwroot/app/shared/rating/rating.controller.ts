/// <reference path="../../../../client/typings/angularjs/index.d.ts" />

class RatingController {
    static $inject = ["$scope"];

    readonly stars: number[] = [1, 2, 3, 4, 5];
    value: number;

    constructor(private scope) {
    }

    hasRating(rating: number): boolean {
        return this.value >= rating;
    }
}

angular
    .module("app")
    .controller("RatingController", RatingController);