/// <reference path="../../../client/typings/angularjs/index.d.ts" />

class ResumeController implements ng.IOnInit {
    static $inject = ['$http'];

    public resume: any;

    constructor(private $http: ng.IHttpService) {        
    }

    $onInit() {
        this.$http.get("app/resume/resume.json").then((response) => {
            this.resume = response.data;
        });
    }
}

angular
    .module("app")
    .controller("ResumeController", ResumeController);