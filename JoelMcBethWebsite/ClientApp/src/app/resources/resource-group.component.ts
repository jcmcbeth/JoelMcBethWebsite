import { Component, Input } from "@angular/core";
import { ResourceGroup } from "./resource-group";

@Component({
    selector: "app-resource-group",
    templateUrl: "./resource-group.component.html"
})
export class ResourceGroupComponent{
    @Input() group: ResourceGroup;


}
