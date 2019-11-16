/// <reference path="../../../../client/typings/angularjs/index.d.ts" />
/// <reference path="../../books/book.ts" />
/// <reference path="../../books/book.service.ts" />

class EditBookController {
    static $inject = ["BookService", "$state"];

    book: Book;
    id: number;
    error: string;

    constructor(private bookService: BookService, private state) {
        this.book = <Book>{};
        this.id = this.state.id;
    }

    updateBook(book) {
        this.bookService.updateBook(book).then(updatedBook => {
            book.id = updatedBook.id;

            this.state.go("admin-books");
        }, response => {
            this.error = response.data.error;
        });
    }
}

angular
    .module("app")
    .controller("EditBookController", EditBookController);