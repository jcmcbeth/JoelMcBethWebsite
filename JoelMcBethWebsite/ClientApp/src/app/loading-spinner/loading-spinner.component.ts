import { Component } from "@angular/core";
import { LoadingService } from "./loading.service";

@Component({
    selector: 'app-loading-spinner',
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {
    public loading: boolean;

    constructor(private readonly loadingService: LoadingService) {
        this.loadingService.loading.subscribe(loading => {
            this.loading = loading;
        });
    }
}
