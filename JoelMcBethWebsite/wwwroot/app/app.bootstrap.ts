/// <reference path="../../client/typings/angularjs/index.d.ts" />
/// <reference path="shared/models/config.ts" />

(function () {
    angular.element(function () {
        var injector = angular.injector(["ng"]);
        var $http = injector.get("$http");

        $http.get("/config.json").then(function (response) {
            const config = <Config>response.data;

            angular
                .module("app")
                .constant("config", config);

            angular.bootstrap(document, ['app'], { strictDi: true });
        });	
	});
})();