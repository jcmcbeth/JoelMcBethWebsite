/// <reference path="../../../../client/typings/angularjs/index.d.ts" />
/// <reference path="../../books/book.ts" />
/// <reference path="../../books/book.service.ts" />
/// <reference path="../../books/author.ts" />

class AuthorListController {
    static $inject = ["BookService", "$state"];

    book: Book;
    error: string;
    form: ng.IFormController;

    constructor(private bookService: BookService, private state) {
        this.book = <Book>{};
        this.book.authors = new Array<Author>();
    }

    createAuthor(): void {
        this.book.authors.push(new Author());
    }

    removeAuthor(author: Author): void {
        var index = this.book.authors.indexOf(author);

        this.book.authors.splice(index, 1);
    }
}

angular
    .module("app")
    .controller("AuthorListController", AuthorListController);