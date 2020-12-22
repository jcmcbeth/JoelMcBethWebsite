import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { LoadingService } from './loading-spinner/loading.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'app';

    constructor(private readonly loadingService: LoadingService, private readonly router: Router) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.loadingService.load();
            }
            else if (event instanceof NavigationEnd) {
                this.loadingService.complete();
            }
        }, error => {
                this.loadingService.complete();
        });
    }
}
