import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Book } from "../books/book";
import { PagedArray } from "../shared/models/paged-array";
import { User } from "./user";

@Injectable({
    providedIn: 'root',
})
export class UserService {    

    private baseUrl: string;

    constructor(
        private readonly httpClient: HttpClient,
        @Inject("API_URL") baseUrl: string
    ) {
        this.baseUrl = baseUrl + "/users";
    }

    public getUsers(
        page: number,
        pageSize: number): Observable<PagedArray<User>> {

        const params = {
            page: page ? page.toString() : "1",
            pageSize: pageSize ? pageSize.toString() : "25"
        };

        return this.httpClient.get<PagedArray<User>>(this.baseUrl, {
            params: params
        });
    }

    addUser(user): Observable<void> {
        return this.httpClient.post<void>(this.baseUrl, user);
    }

    approval(id: number, approved: boolean): Observable<void> {
        const url = this.baseUrl + "/" + id + "/approval/" + approved;

        return this.httpClient.patch<void>(url, null);
    }
}
