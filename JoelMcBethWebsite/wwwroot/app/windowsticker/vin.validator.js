(function () {
    'use strict';

    angular
        .module('app')
        .directive('vin', vin);

    vin.$inject = [];

    function vin() {
        var manufacturers = {
            "JA3": "Mitsubishi",
            "JA4": "Mitsubishi",
            "JMY": "Mitsubishi Motors",
            "JMB": "Mitsubishi Motors"
        };

        var directive = {
            require: "ngModel",
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            ngModel.$parsers.unshift(function (viewValue) {
                if (typeof viewValue !== 'string') {
                    return undefined;
                }

                if (viewValue.length !== 17) {
                    setValidity(false);

                    return null;
                }

                var manufacturerIdentifier = viewValue.substring(0, 3);

                var value = {
                    vin: viewValue,
                    manufacturerIdentifier: manufacturerIdentifier,
                    manufacturer: manufacturers[manufacturerIdentifier],
                    vehicleDescription: viewValue.substring(3, 9),
                    vehicleIdentifier: viewValue.substring(9, 17)
                };

                setValidity(true);

                return value;
            });

            ngModel.$formatters.unshift(function (value) {
                if (value && value.vin) {
                    return value.vin;
                }

                return undefined;
            });

            function setValidity(isValid) {
                ngModel.$setValidity("vin", isValid);
            }
        }
    }
})();