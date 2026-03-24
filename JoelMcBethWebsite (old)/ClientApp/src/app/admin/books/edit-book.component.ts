import { OnInit, Component } from "@angular/core";
import { Book } from "../../books/book";
import { BookService } from "../../books/book.service";
import { ActivatedRoute } from "@angular/router";
import { Author } from "../../books/author";

@Component({
    selector: "admin-edit-book",
    templateUrl: "./edit-book.component.html"
})
export class EditBookComponent implements OnInit {
    book: Book;
    id: number;
    error: string;

    constructor(private bookService: BookService, private readonly route: ActivatedRoute) {
        this.book = <Book>{};
    }

    updateBook() {
        this.bookService.updateBook(this.book).subscribe(updatedBook => {
            this.book = updatedBook;
        }, response => {
            this.error = response?.data?.error ?? "Failed to update the book.";
        });
    }

    ngOnInit(): void {
        this.id = Number(this.route.snapshot.paramMap.get("id"));
        this.bookService.getBookById(this.id).subscribe((book: Book) => {
            this.book = book;
        });
    }

    createAuthor(): void {
        var author = new Author();
        author.id = 0;

        this.book.authors.push(author);    
    }

    removeAuthor(author: Author): void {
        var index = this.book.authors.indexOf(author);

        this.book.authors.splice(index, 1);
    }
}
