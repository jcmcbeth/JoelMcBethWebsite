/// <reference path="../../../client/typings/angularjs/index.d.ts" />

class AdblockController implements ng.IOnInit {
    static $inject = [];

    book: Book;

    constructor() {
    }

    $onInit(): void {
    }
}

angular
    .module("app")
    .controller("AdblockController", AdblockController);