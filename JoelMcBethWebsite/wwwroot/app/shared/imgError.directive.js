(function () {
    'use strict';

    angular
        .module('app')
        .directive('imgError', imgError);

    imgError.$inject = [];

    function imgError() {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            element.bind("error", onError);

            function onError() {
                if (attrs.src !== attrs.imgError) {
                    attrs.$set("src", attrs.imgError);
                }
            }
        }
    }

})();