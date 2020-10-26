import { OnInit, Component } from "@angular/core";
import { ResourceService } from "./resource.service";
import { ResourceGroup } from "./resource-group";

@Component({
    selector: 'app-resources',
    templateUrl: './resources.component.html'
})
export class ResourcesComponent implements OnInit {
    groups: ResourceGroup[];

    constructor(private resourceService: ResourceService) {      
    }

    ngOnInit(): void {
        this.resourceService.getResourceGroups().subscribe(groups => {
            this.groups = groups;
        });
    }
}
