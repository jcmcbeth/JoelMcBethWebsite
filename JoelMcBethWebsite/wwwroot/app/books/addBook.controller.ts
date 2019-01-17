/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="book.ts" />
/// <reference path="book.service.ts" />

class AddBookController {
    static $inject = ["BookService", "$state"];

    book: Book;
    error: string;

    constructor(private bookService: BookService, private state) {
        this.book = <Book>{};
    }

    addBook(book) {
        this.bookService.addBook(book).then(updatedBook => {
            book.id = updatedBook.id;

            this.state.go("books");
        }, response => {
            this.error = response.data.error;
        });
    }
}

angular
    .module("app")
    .controller("AddBookController", AddBookController);