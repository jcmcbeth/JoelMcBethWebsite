import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ResumeService {
    private baseUrl: string;

    constructor(private httpClient: HttpClient, @Inject("BASE_URL") baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    getResume(): Observable<any> {
        const url = this.baseUrl + "/data/resume.json";

        return this.httpClient.get<any>(url);
    }
}
