/// <reference path="author.ts" />
/// <reference path="book-review.ts" />
interface Book {
    id: number;    
    isbn13: string;
    title: string;
    edition: string;
    pages: number;
    order: number;
    authors: Author[];
    reviews: BookReview[];
}