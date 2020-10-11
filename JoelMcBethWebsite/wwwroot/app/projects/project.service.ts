/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="project.ts" />
/// <reference path="../shared/models/config.ts" />

class ProjectService {
    static $inject = ["$http", "config"];

    private baseUrl: string;

    constructor(private http: ng.IHttpService, config: Config) {
        this.baseUrl = config.serviceUrlBase + "/projects";
    }

    getProjects() {
        return this.http.get<Project[]>(this.baseUrl).then(response => {
            return response.data;
        });
    }
}

angular
    .module("app")
    .service("projectService", ProjectService);