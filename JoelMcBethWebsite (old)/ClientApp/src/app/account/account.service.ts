import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserRegistration } from "./user-registration";

@Injectable({
    providedIn: "root"
})
export class AccountService {
    private baseUrl;

    constructor(private httpClient: HttpClient, @Inject("API_URL") baseUrl: string) {
        this.baseUrl = baseUrl + "/account";
    }

    register(registration: UserRegistration): Observable<boolean> {
        const url = this.baseUrl + "/" + "register";

        return this.httpClient.post<boolean>(url, registration);
    }
}
