/// <reference path="../../../client/typings/angularjs/index.d.ts" />

class NoCoverSource implements ng.IDirective {
    public restrict: string;

    constructor() {
        this.restrict = 'A';
    }

    link(scope, element, attrs) {
        element.bind("load", () => {
            if (attrs.src !== attrs.noCoverSrc && element[0].clientWidth === 1 && element[0].clientHeight === 1) {
                attrs.$set("src", attrs.noCoverSrc);
            }
        });
    }

    static getFactory(): ng.IDirectiveFactory {
        const directive = () => new NoCoverSource();

        return directive;
    }
}

angular
    .module('app')
    .directive('noCoverSrc', NoCoverSource.getFactory());