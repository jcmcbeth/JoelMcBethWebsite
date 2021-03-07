import { Component, Input } from "@angular/core";

@Component({
    selector: "app-rating",
    templateUrl: "./rating.component.html",
    styleUrls: ["./rating.component.css"]
})
export class RatingComponent {
    readonly stars: number[] = [1, 2, 3, 4, 5];
    @Input() value: number;

    constructor() {
    }

    hasRating(rating: number): boolean {
        return this.value >= rating;
    }
}
