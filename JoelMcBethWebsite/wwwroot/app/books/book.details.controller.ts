/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="book.service.ts" />
/// <reference path="book.ts" />

class BookDetailsController implements ng.IOnInit {  
    static $inject = ["BookService", "$stateParams"];

    book: Book;

    constructor(private bookService: BookService, private stateParams) {
    }

    $onInit(): void {
        let isbn = this.stateParams.isbn;

        this.bookService.getBookByIsbn13(isbn).then(book => {
            this.book = book;
        });
    }
}

angular
    .module("app")
    .controller("BookDetailsController", BookDetailsController);