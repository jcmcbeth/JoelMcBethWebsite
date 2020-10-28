import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Zone } from "./zone";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class InfantryBrowserService {
    static $inject = ["$http", "config"];

    private baseUrl: string;

    constructor(private httpClient: HttpClient, @Inject("API_URL") baseUrl: string) {
        this.baseUrl = baseUrl + "/infantry/browser";
    }

    public getZones(): Observable<Zone[]> {
        const url = this.baseUrl + "/zones";

        return this.httpClient.get<Zone[]>(url);
    }
}
