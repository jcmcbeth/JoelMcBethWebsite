import { Component, OnInit } from "@angular/core";
import { Book } from "./book";
import { BookService } from "./book.service";
import { Option } from "../shared/file";
import { SortDirection } from "../shared/sort-direction";

@Component({
    selector: "app-books",
    templateUrl: "./books.component.html",
    styleUrls: ["./books.component.css"]
})
export class BooksComponent implements OnInit {
    pageSize: number;
    page: number;
    pageCount: number;
    pages: number[];
    sort: number;
    sortDirection: number;
    sortDirections: Option[];
    sortOptions: Option[];
    books: Book[];
    filterText: string;

    constructor(private bookService: BookService) {
        this.pageSize = 12;
        this.page = 1;
        this.pageCount = 0;
        this.pages = [];
        this.sort = 0;
        this.sortDirection = 0;
        this.sortDirections = [
            { name: "Acsending", value: SortDirection.Ascending },
            { name: "Descending", value: SortDirection.Descending }
        ];
        this.sortOptions = [
            { name: "None", value: 0 },
            { name: "Title", value: 1 },
            { name: "Rating", value: 2 }
        ];
        this.books = [];
        this.filterText = "";
    }

    selectPage(page: number) {
        if (page <= this.pageCount || page >= 1) {
            this.page = page;

            this.updateBooks();
        }
    }

    filterBooks() {
        this.page = 1;
        this.updateBooks();
    }

    updateBooks() {
        return this.bookService.getBooks(this.filterText, this.page, this.pageSize, this.sort, this.sortDirection).subscribe(data => {
            this.books = data.items;
            this.pageCount = data.pagination.pages;

            this.updatePages();
        });
    }

    ngOnInit(): void {
        this.updateBooks();
    }

    private updatePages() {
        // I couldn't find a simple way to do a repeat over a range of
        // numbers. I think the easiest way was to just create an array
        // of the numbers.
        this.pages = new Array(this.pageCount);
        for (var i = 0; i < this.pageCount; i++) {
            this.pages[i] = i + 1;
        }
    }
}
