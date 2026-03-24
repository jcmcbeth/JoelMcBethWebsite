import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, fromEvent } from "rxjs";
import { map, mergeMap } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class CameraService {
    private baseUrl: string;

    constructor(
        private readonly httpClient: HttpClient,
        @Inject("API_URL") baseUrl: string) {

        this.baseUrl = baseUrl + "/camera";
    }

    getSnapshotUrl(): Observable<string> {
        const url = this.baseUrl + "/Snapshot";

        const reader = new FileReader();

        return this.httpClient.get(url, { responseType: "blob" }).pipe(
            mergeMap(imageBlob => {
                var observable = fromEvent(reader, "load")
                    .pipe(
                        map(event => <string>reader.result)
                    );

                if (imageBlob) {
                    reader.readAsDataURL(imageBlob);
                }

                return observable;
            })
        );

        //return this.http({
        //    method: 'GET',
        //    url: url,
        //    responseType: 'arraybuffer',
        //}).then(response => {
        //    //return 'data:image/jpeg;base64,' + this._arrayBufferToBase64(response.data);
        //    //let blob = new Blob([response.data], { type: "image/jpeg" });

        //    //return this.window.URL.createObjectURL(blob);
        //    return null;
        //});
    }

    private _arrayBufferToBase64(buffer) {
        var binary = "";
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }
}
