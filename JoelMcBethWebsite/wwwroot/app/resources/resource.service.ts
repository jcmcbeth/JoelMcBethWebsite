/// <reference path="../../../client/typings/angularjs/index.d.ts" />

class ResourceService {
    static $inject = ["$http"];

    constructor(private $http: ng.IHttpService) {

    }

    getGroupedResources() {
        return this.$http.get("/data/resources.json").then(response => {
            return response.data;
        });
    }
}

angular
    .module('app')
    .service('resourceService', ResourceService);