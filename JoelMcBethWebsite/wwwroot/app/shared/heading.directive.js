/// <reference path="../../../client/typings/angularjs/index.d.ts" />
var HeadingDirective = /** @class */ (function () {
    function HeadingDirective() {
        this.restrict = "E";
        this.transclude = true;
        this.scope = {
            level: "<"
        };
    }
    HeadingDirective.prototype.link = function (scope, element, attrs, controller, transclude) {
        var level = 1;
        if (scope.level) {
            if (!angular.isNumber(scope.level)) {
                throw new Error("The heading level must be be a number.");
            }
            level = scope.level;
        }
        var tag = "<h" + scope.level + "></h" + scope.level + ">";
        var headingElement = angular.element(tag);
        headingElement.append(transclude());
        element.append(headingElement);
    };
    HeadingDirective.getFactory = function () {
        var directive = function () { return new HeadingDirective(); };
        return directive;
    };
    HeadingDirective.$inject = ["$window"];
    return HeadingDirective;
}());
angular
    .module("app")
    .directive("heading", HeadingDirective.getFactory());
//# sourceMappingURL=heading.directive.js.map