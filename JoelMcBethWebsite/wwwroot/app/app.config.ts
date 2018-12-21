/// <reference path="../../client/typings/angularjs/index.d.ts" />

(function () {
    angular
        .module("app")
        .config(["$transitionsProvider", "$cssProvider", "$locationProvider", "$compileProvider", configure]);

    function configure($transitionsProvider, $cssProvider, $locationProvider, $compileProvider) {

        // Workaround: ui.router no longer supports the $stateChangeSuccess event
        // but the angularCSS module depends on it.
        var previousState;
        $transitionsProvider.onEnter({}, function (trans, state) {
            var $rootScope = trans.injector().get('$rootScope');
            $rootScope.$emit('$stateChangeSuccess', state, null, previousState);
            previousState = state;
        });

        $locationProvider.html5Mode(true);

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|infantry):/);
    }
})();