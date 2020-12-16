import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PagedArray } from "../shared/models/paged-array";
import { Book } from "./book";

@Injectable({
    providedIn: 'root',
})
export class BookService {
    private baseUrl;

    constructor(private httpClient: HttpClient, @Inject("API_URL") baseUrl: string) {
        this.baseUrl = baseUrl + "/books";
    }

    public getBooks(
        filter: string,
        page: number,
        pageSize: number,
        sort: number,
        sortDirection): Observable<PagedArray<Book>> {

        const params = {
            filter: filter,
            page: page ? page.toString() : "1",
            pageSize: pageSize ? pageSize.toString() : "25",
            sort: sort ? sort.toString() : "0",
            sortDirection: sortDirection ? sortDirection.toString() : "0"
        };

        return this.httpClient.get<PagedArray<Book>>(this.baseUrl, {
            params: params
        });
    }

    public getBookByIsbn13(isbn: string): Observable<Book> {
        const url = this.baseUrl + "/" + isbn;

        return this.httpClient.get<Book>(url);
    }

    public getBookById(id: number): Observable<Book> {
        var url = this.baseUrl + "/" + id;

        return this.httpClient.get<Book>(url);
    }

    public addBook(book: Book): Observable<Book> {
        var url = this.baseUrl;

        return this.httpClient.post<Book>(url, book);
    }

    public updateBook(book): Observable<Book> {
        var url = this.baseUrl;

        return this.httpClient.put<Book>(url, book);
    }
}
