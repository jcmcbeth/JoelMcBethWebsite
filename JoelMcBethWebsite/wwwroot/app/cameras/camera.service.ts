/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="../shared/models/config.ts" />

class CameraService {
    static $inject = ["config", "$http", "$window"];

    private baseUrl: string;

    constructor(
        private config: Config,
        private http: ng.IHttpService,
        private window: ng.IWindowService) {

        this.baseUrl = config.serviceUrlBase + "/camera";
    }

    getSnapshotUrl() {
        const url = this.baseUrl + "/Snapshot";

        return this.http({
            method: 'GET',
            url: url,
            responseType: 'arraybuffer',
        }).then(response => {
            //return 'data:image/jpeg;base64,' + this._arrayBufferToBase64(response.data);
            //let blob = new Blob([response.data], { type: "image/jpeg" });

            //return this.window.URL.createObjectURL(blob);
            return null;
        });
    }

    private _arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }
}

angular
    .module("app")
    .service('CameraService', CameraService);