/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="zone.ts" />
/// <reference path="../shared/models/config.ts" />

class InfantryBrowserService {
    static $inject = ["$http", "config"];

    private baseUrl: string;

    constructor(private $http: ng.IHttpService, config: Config) {
        this.baseUrl = config.serviceUrlBase + "/infantry/browser";
    }

    getZones(): ng.IPromise<Zone[]> {
        const url = this.baseUrl + "zones";

        return <ng.IPromise<Zone[]>>this.$http.get(url).then(response => {
            return response.data;
        });
    }
}

angular
    .module("app")
    .service("InfantryBrowserService", InfantryBrowserService);