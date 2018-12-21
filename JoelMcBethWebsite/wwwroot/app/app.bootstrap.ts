/// <reference path="../../client/typings/angularjs/index.d.ts" />

(function () {
    angular.element(function () {
        var injector = angular.injector(["ng"]);
        var $http = injector.get("$http");

        $http.get("/config.json").then(function (response) {
            var config = response.data;

            angular
                .module("app")
                .constant("config", config);

            angular.bootstrap(document, ['app'], { strictDi: true });
        });	
	});
})();