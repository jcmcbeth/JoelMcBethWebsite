/// <reference path="../../../client/typings/angularjs/index.d.ts" />

(function () {
    angular
        .module("app")
        .controller("ResumeController", ResumeController);

    ResumeController.$inject = ["$http"];

    function ResumeController($http) {
        var vm = this;

        activate();

        function activate() {
            return $http.get("app/resume/resume.json").then(function (response) {
                vm.resume = response.data;
            });
        }
    }
})();