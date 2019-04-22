/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="camera.service.ts" />

class CameraController {
    static $inject = ["CameraService", "$interval"];

    public snapshotUrl: string;
    public refreshAutomatically: boolean;
    public refreshInterval: number;
    public timeoutPromise: ng.IPromise<void>;

    constructor(
        private cameraService: CameraService,
        private interval: ng.IIntervalService) {
        this.refreshInterval = 5;
        this.refreshAutomatically = false;
    }

    $onInit() {
        this.refresh();
    }

    refresh() {
        this.cameraService.getSnapshotUrl().then(url => {
            this.snapshotUrl = url;
        });
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
        this.interval(() => this.refresh(),
        this.refreshInterval * 1000)
    }

    private stopAutomaticRefresh() {
        this.interval.cancel(this.timeoutPromise);
        this.timeoutPromise = null;
    }
}

angular
    .module("app")
    .controller("CameraController", CameraController);