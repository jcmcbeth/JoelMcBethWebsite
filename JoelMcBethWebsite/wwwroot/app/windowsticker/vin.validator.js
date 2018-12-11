(function () {
    'use strict';

    angular
        .module('app')
        .directive('vin', vin);

    vin.$inject = [];

    function vin() {
        var directive = {
            require: "ngModel",
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            ngModel.$parsers.unshift(function (vin) {
                return validate(vin);
            });

            ngModel.$formatters.unshift(function (vin) {
                return validate(vin);
            });

            function validate(value) {
                if (typeof value !== 'string') {
                    return undefined;
                }

                var vin = value.toUpperCase();

                if (vin.length !== 17) {
                    setValidity(false);

                    return vin;
                }

                if (vin[1] !== 'A') {
                    setValidity(false);

                    return vin;
                }

                setValidity(true);

                return value;
            }

            function setValidity(isValid) {
                ngModel.$setValidity("vin", isValid);
            }
        }
    }
})();