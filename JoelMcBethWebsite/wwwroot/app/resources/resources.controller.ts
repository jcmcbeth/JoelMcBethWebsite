/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="resource.service.ts" />

class ResourceController implements ng.IOnInit {
    static $inject = ['resourceService', '$q'];

    groups: any;

    constructor(private resourceService: ResourceService) {      
    }

    $onInit(): void {
        var groupsPromise = this.resourceService.getGroupedResources().then((groups) => {
            this.groups = groups;
        });
    }
}

angular
    .module('app')
    .controller('ResourceController', ResourceController);
