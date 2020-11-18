import { OnInit, Component } from "@angular/core";
import { MediaService } from "./media.service";

@Component({
    selector: 'app-media',
    templateUrl: './media.component.html'
})
export class MediaComponent implements OnInit {
    filterText: string;
    media: any[];

    constructor(private mediaService: MediaService) {
        this.filterText = "";
    }

    search(): void {
        this.updateMedia();
    }

    ngOnInit(): void {
        this.updateMedia();
    }

    private updateMedia(): void {
        this.mediaService.getMedia(this.filterText).subscribe(media => {
            this.media = media;
        });
    }
}
