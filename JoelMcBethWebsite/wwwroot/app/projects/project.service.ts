/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="project.ts" />

class ProjectService {
    static $inject = ["$http"];

    constructor(private http: ng.IHttpService) {
    }

    getProjects() {
        return this.http.get<Project[]>("/api/projects").then(response => {
            return response.data;
        });
    }
}

angular
    .module("app")
    .service("projectService", ProjectService);