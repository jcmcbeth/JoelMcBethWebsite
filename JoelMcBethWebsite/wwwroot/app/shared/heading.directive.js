(function () {
    'use strict';

    angular
        .module('app')
        .directive('heading', heading);

    heading.$inject = [];

    function heading($window) {
        var directive = {
            link: link,
            restrict: "E",
            transclude: true,
            scope: {
                level: "<"
            }
        };
        return directive;

        function link(scope, element, attrs, controller, transclude) {
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
        }
    }

})();