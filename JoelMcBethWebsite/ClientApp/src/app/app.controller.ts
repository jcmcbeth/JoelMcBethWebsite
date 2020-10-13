/// <reference path="../../client/typings/angularjs/index.d.ts" />

(function () {
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    AppController.$inject = [];

    function AppController() {
        /* jshint validthis:true */
        var vm = this;

        vm.loaded = false;
        vm.initialize = initialize;

        activate();

        function activate() {
        }

        function initialize() {
            vm.loaded = true;
        }
    }
})();
