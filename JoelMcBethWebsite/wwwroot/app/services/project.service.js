(function () {
    angular
        .module("app")
        .factory("projectService", projectService);

    projectService.$inject = ["$http"];

    function projectService($http) {
        return {
            getProjects: getProjects
        };

        function getProjects() {
            return $http.get("/api/projects").then(getProjectsComplete);

            function getProjectsComplete(response) {
                return response.data;
            }
        }
    }
})();