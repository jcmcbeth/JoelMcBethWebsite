/// <reference path="../../../client/typings/angularjs/index.d.ts" />
var ImageErrorDirective = /** @class */ (function () {
    function ImageErrorDirective() {
        this.restrict = "A";
    }
    ImageErrorDirective.prototype.link = function (scope, element, attrs) {
        element.bind("error", function () {
            if (attrs.src !== attrs.imgError) {
                attrs.$set("src", attrs.imgError);
            }
        });
    };
    ImageErrorDirective.getFactory = function () {
        var directive = function () { return new ImageErrorDirective(); };
        return directive;
    };
    return ImageErrorDirective;
}());
angular
    .module("app")
    .directive("imgError", ImageErrorDirective.getFactory());
//# sourceMappingURL=imgError.directive.js.map