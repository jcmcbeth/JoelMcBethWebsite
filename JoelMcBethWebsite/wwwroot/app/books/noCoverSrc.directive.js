(function () {
    'use strict';

    angular
        .module('app')
        .directive('noCoverSrc', noCoverSrc);

    noCoverSrc.$inject = [];

    function noCoverSrc() {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            element.bind("load", onLoad);

            function onLoad() {
                if (attrs.src !== attrs.noCoverSrc && element[0].clientWidth === 1 && element[0].clientHeight ===1) {
                    attrs.$set("src", attrs.noCoverSrc);
                }
            }
        }
    }

})();