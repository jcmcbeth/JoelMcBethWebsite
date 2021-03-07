import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Project } from "./project";

@Injectable({
    providedIn: 'root',
})
export class ProjectService {
    private baseUrl: string;

    constructor(private httpClient: HttpClient, @Inject('API_URL') apiUrl: string) {
        this.baseUrl = apiUrl + "/projects";
    }

    public getProjects(): Observable<Project[]> {
        return this.httpClient.get<Project[]>(this.baseUrl);
    }
}
