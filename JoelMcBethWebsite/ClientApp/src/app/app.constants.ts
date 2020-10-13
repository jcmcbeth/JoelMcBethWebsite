/// <reference path="../../client/typings/angularjs/index.d.ts" />

(function () {
    angular
        .module("app")
        .constant("sortDirections", [
            { name: "Ascending", value: 0 },
            { name: "Descending", value: 1 }
        ]);
})();