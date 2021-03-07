import { BookService } from "./book.service";
import { Book } from "./book";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-book-details',
    templateUrl: './book-details.component.html',
})
export class BookDetailsComponent implements OnInit {  
    public book: Book;

    constructor(private route: ActivatedRoute, private bookService: BookService) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const isbn = params["isbn"];

            this.bookService.getBookByIsbn13(isbn).subscribe(book => {
                this.book = book;
            });
        });
    }
}
