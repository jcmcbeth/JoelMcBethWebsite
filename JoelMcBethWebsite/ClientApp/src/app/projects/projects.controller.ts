/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="project.service.ts" />

class ProjectController implements ng.IOnInit {   
    static $inject = ["projectService"];

    projects: Project[];

    constructor(private projectService: ProjectService) {
    }

    $onInit(): void {
        this.projectService.getProjects().then(projects => {
            this.projects = projects;
        });
    }
}

angular
    .module("app")
    .controller("ProjectController", ProjectController);