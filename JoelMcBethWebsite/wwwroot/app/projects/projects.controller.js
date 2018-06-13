(function () {
    "use strict"
    angular
        .module("app")
        .controller("ProjectController", ProjectController);

    ProjectController.$inject = ["$http", "projectService"];

    function ProjectController($http, projectService) {
        var vm = this;

        activate();

        function activate() {
            return projectService.getProjects().then(function (projects) {

                console.log(projects);
                vm.projects = projects;
            });
        }
    }
})();