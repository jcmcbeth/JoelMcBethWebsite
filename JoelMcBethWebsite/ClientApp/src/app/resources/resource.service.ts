import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { ResourceGroup } from "./resource-group";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ResourceService {
    private baseUrl: string;

    constructor(private httpClient: HttpClient, @Inject("BASE_URL") baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    getResourceGroups(): Observable<ResourceGroup[]> {
        const url = this.baseUrl + "/data/resources.json";
        return this.httpClient.get<ResourceGroup[]>(url);
    }
}
