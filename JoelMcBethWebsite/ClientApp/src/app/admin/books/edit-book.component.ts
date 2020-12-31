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

    updateBook(book: Book) {
        this.bookService.updateBook(book).subscribe(updatedBook => {
            if (book.authors) {
                for (let i = 0; i < book.authors.length; i++) {
                    const author = book.authors[i];

                    if (author.id < 0) {
                        author.id = 0;
                    }
                }
            }

            this.book = updatedBook;
        }, error => {
            this.error = "Failed to update the book.";
        });
    }

    ngOnInit(): void {
        this.id = Number(this.route.snapshot.paramMap.get("id"));
        this.bookService.getBookById(this.id).subscribe((book: Book) => {
            this.book = book;
        });
    }

    private lastAuthorId = 0;

    createAuthor(): void {
        var author = new Author();
        author.id = --this.lastAuthorId;

        this.book.authors.push(author);    
    }

    removeAuthor(author: Author): void {
        var index = this.book.authors.indexOf(author);

        this.book.authors.splice(index, 1);
    }
}
