import { OnInit, Component } from "@angular/core";
import { ResumeService } from "./resume.service";

@Component({
    selector: 'app-resume',
    templateUrl: './resume.component.html'
})
export class ResumeComponent implements OnInit {
    private resume: any;

    constructor(private resumeService: ResumeService) {
    }

    ngOnInit(): void {
        this.resumeService.getResume().subscribe(resume => {
            this.resume = resume;
        });
    }
}
