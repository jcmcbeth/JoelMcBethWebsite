/// <reference path="../../../client/typings/angularjs/index.d.ts" />

(function () {
    'use strict';

    angular
        .module('app')
        .controller('ResourceController', ResourceController);

    ResourceController.$inject = ['resourceService', '$q'];

    function ResourceController(resourceService, $q) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        function activate() {
            var groupsPromise = resourceService.getGroupedResources().then(function (groups) {
                vm.groups = groups;
            });
        }
    }
})();
