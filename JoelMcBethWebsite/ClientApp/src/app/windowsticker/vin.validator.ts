/// <reference path="../../../client/typings/angularjs/index.d.ts" />

class VinValidator implements ng.IDirective {
    private manufacturers = {
        "JA3": "Mitsubishi",
        "JA4": "Mitsubishi",
        "JMY": "Mitsubishi Motors",
        "JMB": "Mitsubishi Motors"
    };

    public require: string;
    public restrict: string;

    constructor() {
        this.require = "ngModel";
        this.restrict = "A";
    }

    link(scope, element, sttrs, ngModel) {
        ngModel.$parsers.unshift((viewValue) => {
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
                manufacturer: this.manufacturers[manufacturerIdentifier],
                vehicleDescription: viewValue.substring(3, 9),
                vehicleIdentifier: viewValue.substring(9, 17)
            };

            setValidity(true);

            return value;
        });

        ngModel.$formatters.unshift((value) => {
            if (value && value.vin) {
                return value.vin;
            }

            return undefined;
        });

        function setValidity(isValid) {
            ngModel.$setValidity("vin", isValid);
        }
    }

    static factory(): ng.IDirectiveFactory {
        return () => new VinValidator();
    }
}

angular
    .module('app')
    .directive('vin', VinValidator.factory());