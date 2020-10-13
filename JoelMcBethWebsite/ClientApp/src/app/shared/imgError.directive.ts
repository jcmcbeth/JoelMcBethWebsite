/// <reference path="../../../client/typings/angularjs/index.d.ts" />

class ImageErrorDirective implements ng.IDirective {
    public restrict: string;

    constructor() {
        this.restrict = "A";
    }

    link(scope: ng.IScope, element: JQLite, attrs: ng.IAttributes) {
        element.bind("error", () => {
            if (attrs.src !== attrs.imgError) {
                attrs.$set("src", attrs.imgError);
            }
        });
    }

    public static getFactory(): ng.IDirectiveFactory {
        const directive = () => new ImageErrorDirective();

        return directive;
    }
}

angular
    .module("app")
    .directive("imgError", ImageErrorDirective.getFactory());