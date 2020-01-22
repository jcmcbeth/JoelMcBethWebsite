/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="../shared/models/paged-array.ts" />

class BookService {
    static $inject = ["$http", "config"];

    private baseUrl;

    constructor(private http: ng.IHttpService, config: any) {
        this.baseUrl = config.serviceUrlBase + "/books";
    }

    getBooks(filter, page, pageSize, sort, sortDirection): ng.IPromise<PagedArray<Book>> {
        return this.http.get<PagedArray<Book>>(this.baseUrl, {
            params: {
                filter: filter,
                page: page,
                pageSize: pageSize,
                sort: sort,
                sortDirection: sortDirection
            }
        }).then(response => {
            return response.data;
        });
    }

    getBookByIsbn13(isbn): ng.IPromise<Book> {
        var url = this.baseUrl + "/" + isbn;

        return this.http.get<Book>(url).then(response => {
            return response.data;
        });
    }

    getBookById(id: number): ng.IPromise<Book> {
        var url = this.baseUrl + "/" + id;

        return this.http.get<Book>(url).then(response => {
            return response.data;
        });
    }

    addBook(book): ng.IPromise<Book> {
        var url = this.baseUrl;

        return this.http.post<Book>(url, book).then(response => {
            return response.data;
        });
    }

    updateBook(book): ng.IPromise<Book> {
        var url = this.baseUrl;

        return this.http.put<Book>(url, book).then(response => {
            return response.data;
        });
    }
}

angular
    .module("app")
    .service("BookService", BookService);