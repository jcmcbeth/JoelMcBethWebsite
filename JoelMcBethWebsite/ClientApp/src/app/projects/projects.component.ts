import { Component, OnInit } from "@angular/core";
import { Project } from "./project";
import { ProjectService } from "./project.service";

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {   
    public projects: Project[];

    constructor(private projectService: ProjectService) {
    }

    public ngOnInit(): void {
        this.projectService.getProjects().subscribe(projects => {
            this.projects = projects;
        });
    }
}
