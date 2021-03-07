import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class LoadingService {
    public readonly loading: BehaviorSubject<boolean>;
    private pending: number;

    constructor() {
        this.pending = 0;
        this.loading = new BehaviorSubject(false);
    }

    load(): void {        
        this.pending++;

        if (this.pending === 1) {
            this.loading.next(true);
        }
    }

    complete(): void {        
        this.pending--;

        if (this.pending === 0) {
            this.loading.next(false);
        }
    }
}
