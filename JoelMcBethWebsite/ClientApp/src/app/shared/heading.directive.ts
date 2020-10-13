/// <reference path="../../../client/typings/angularjs/index.d.ts" />

class HeadingDirective implements ng.IDirective {
    static $inject = ["$window"];

    public restrict: string;
    public transclude: boolean;
    public scope;

    constructor() {
        this.restrict = "E";
        this.transclude = true;
        this.scope = {
            level: "<"
        };
    }

    link(scope, element, attrs, controller, transclude) {
        let level = 1;

        if (scope.level) {
            if (!angular.isNumber(scope.level)) {
                throw new Error("The heading level must be be a number.");
            }

            level = scope.level;
        }

        let tag = "<h" + scope.level + "></h" + scope.level + ">";
        let headingElement = angular.element(tag);

        headingElement.append(transclude());

        element.append(headingElement);
    }

    public static getFactory(): ng.IDirectiveFactory {
        const directive = () => new HeadingDirective();

        return directive;
    }
}

angular
    .module("app")
    .directive("heading", HeadingDirective.getFactory());