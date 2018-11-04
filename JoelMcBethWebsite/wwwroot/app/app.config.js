(function () {
    angular
        .module("app")
        .config(["$transitionsProvider", "$cssProvider", configure]);

    function configure($transitionsProvider, $cssProvider) {

        // Workaround: ui.router no longer supports the $stateChangeSuccess event
        // but the angularCSS module depends on it.
        var previousState;
        $transitionsProvider.onEnter({}, function (trans, state) {
            var $rootScope = trans.injector().get('$rootScope');
            $rootScope.$emit('$stateChangeSuccess', state, null, previousState);
            previousState = state;
        });
    }
})();