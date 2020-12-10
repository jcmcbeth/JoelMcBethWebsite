/// <reference path="../../../client/typings/angularjs/index.d.ts" />

class MediaService {
    static $inject = ["$http", "config"];

    private baseUrl: string;

    constructor(private http: ng.IHttpService, config: Config) {
        this.baseUrl = config.serviceUrlBase + "/media";
    }

    getMedia(filter: any) {
        return this.http.get(this.baseUrl, {
            params: {
                filter: filter
            }
        }).then(response => {
            return {
                media: response.data
            };
        });
    }
}

angular
    .module("app")
    .service("mediaService", MediaService);