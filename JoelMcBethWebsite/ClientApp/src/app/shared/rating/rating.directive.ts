/// <reference path="../../../../client/typings/angularjs/index.d.ts" />

class RatingDirective implements ng.IDirective {
    public scope = {
        value: "<"
    };
    public restrict = "E";    
    public controller = "RatingController as $ctrl";
    public bindToController = true;
    public templateUrl = "/app/shared/rating/rating.html";
    public css = "/app/shared/rating/rating.css";

    static getFactory(): ng.IDirectiveFactory {
        const directive = () => new RatingDirective();

        return directive;
    }
}

angular
    .module('app')
    .directive('rating', RatingDirective.getFactory());