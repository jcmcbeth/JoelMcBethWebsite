import { Component } from "@angular/core";
import { Book } from "../../books/book";
import { Author } from "../../books/author";
import { Router } from "@angular/router";
import { BookService } from "../../books/book.service";

@Component({
    selector: "admin-add-book",
    templateUrl: "./add-book.component.html"
})
export class AddBookComponent {
    book: Book;
    error: string;

    constructor(private bookService: BookService, private readonly router: Router) {
        this.book = <Book>{};
        this.book.authors = new Array<Author>();
    }

    addBook(book) {
        this.bookService.addBook(book).subscribe(updatedBook => {
            book.id = updatedBook.id;

            this.router.navigate(["/admin/books"]);
        }, response => {
            this.error = response.data.error;
        });
    }

    createAuthor(): void {
        this.book.authors.push(new Author());
    }

    removeAuthor(author: Author): void {
        var index = this.book.authors.indexOf(author);

        this.book.authors.splice(index, 1);
    }
}
