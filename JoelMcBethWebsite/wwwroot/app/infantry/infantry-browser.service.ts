/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="zone.ts" />

class InfantryBrowserService {
    static $inject = ["$http"];

    private baseUrl = "/api/infantry/browser/";

    constructor(private $http: ng.IHttpService) {
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