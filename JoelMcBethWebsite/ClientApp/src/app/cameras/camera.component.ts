import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval, Subscription, timer } from "rxjs";
import { CameraService } from "./camera.service";

@Component({
    selector: "app-camera",
    templateUrl: "./camera.component.html",
    styleUrls: ["./camera.component.css"]
})
export class CameraComponent implements OnInit, OnDestroy {
    public snapshotUrl: string;
    public refreshAutomatically: boolean;
    public refreshInterval: number;

    private refreshSubscription: Subscription;
    private requestPending: boolean;

    constructor(
        private cameraService: CameraService) {
        this.refreshInterval = 5;
        this.refreshAutomatically = false;

        this.requestPending = false;
    }

    ngOnInit(): void {
        this.refresh();
    }

    ngOnDestroy() {
        this.stopAutomaticRefresh();
    }

    refresh() {
        if (!this.requestPending) {
            this.requestPending = true;
            this.cameraService.getSnapshotUrl().subscribe(url => {
                this.snapshotUrl = url;
                this.requestPending = false;
            });
        }
    }

    updateInterval() {
        if (this.refreshAutomatically) {
            this.stopAutomaticRefresh();

            this.startAutomaticRefresh();
        }      
    }

    toggleAutomaticRefresh() {
        if (this.refreshAutomatically) {
            this.startAutomaticRefresh();
        } else {
            this.stopAutomaticRefresh();
        }
    }

    private startAutomaticRefresh() {
        this.refreshSubscription = interval(this.refreshInterval * 1000).subscribe(() => this.refresh());
    }

    private stopAutomaticRefresh() {
        if (this.refreshSubscription != null) {
            this.refreshSubscription.unsubscribe();
            this.refreshSubscription = null;
        }
    }
}
