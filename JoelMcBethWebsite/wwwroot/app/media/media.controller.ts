/// <reference path="../../../client/typings/angularjs/index.d.ts" />

class MediaController implements ng.IOnInit {
    static $inject = ["mediaService"];

    filterText: string;

    constructor(private mediaService) {
    }

    search() {
        this.updateMedia();
    }

    $onInit() {
        this.updateMedia();
    }

    private updateMedia() {
        this.mediaService.getMedia(this.filterText).then(function (data) {
            this.media = data.media;
        });
    }
}

angular
    .module("app")
    .controller("MediaController", MediaController);