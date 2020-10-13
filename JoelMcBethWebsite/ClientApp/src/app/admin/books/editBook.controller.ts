/// <reference path="../../../../client/typings/angularjs/index.d.ts" />
/// <reference path="../../books/book.ts" />
/// <reference path="../../books/book.service.ts" />

class EditBookController implements ng.IOnInit {
    static $inject = ["BookService", "$state"];

    book: Book;
    id: number;
    error: string;
    form: ng.IFormController;

    constructor(private bookService: BookService, private state) {
        this.book = <Book>{};
        this.id = state.params.id;
    }

    updateBook(book) {
        this.bookService.updateBook(book).then(updatedBook => {
            this.book = updatedBook;
        }, response => {
            this.error = response.data.error;
        });
    }

    $onInit(): void {
        this.bookService.getBookById(this.id).then((book: Book) => {
            this.book = book;     

            console.log(this.book);
        });
    }

    canUpdateBook(): boolean {
        return this.form.$dirty && this.form.$valid;
    }
}

angular
    .module("app")
    .controller("EditBookController", EditBookController);