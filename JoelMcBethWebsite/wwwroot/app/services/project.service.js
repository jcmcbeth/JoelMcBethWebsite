/// <reference path="../../../client/typings/angularjs/index.d.ts" />
var ProjectService = /** @class */ (function () {
    function ProjectService(http) {
        this.http = http;
    }
    ProjectService.prototype.getProjects = function () {
        return this.http.get("/api/projects").then(function (response) {
            return response.data;
        });
    };
    ProjectService.$inject = ["$http"];
    return ProjectService;
}());
angular
    .module("app")
    .service("projectService", ProjectService);
//# sourceMappingURL=project.service.js.map