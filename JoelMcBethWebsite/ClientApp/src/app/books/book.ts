import { Author } from "./author";
import { BookReview } from "./book-review";

export interface Book {
    id: number;    
    isbn13: string;
    title: string;
    edition: string;
    pages: number;
    order: number;
    authors: Author[];
    reviews: BookReview[];
}
