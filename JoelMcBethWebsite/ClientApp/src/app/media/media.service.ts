import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class MediaService {
    private baseUrl: string;

    constructor(private httpClient: HttpClient, @Inject('API_URL') apiUrl: string) {
        this.baseUrl = apiUrl + "/media";
    }

    getMedia(filter: string): Observable<any> {
        let params = new HttpParams();

        params = params.append("filter", filter);

        return this.httpClient.get(this.baseUrl, { params: params });
    }
}
