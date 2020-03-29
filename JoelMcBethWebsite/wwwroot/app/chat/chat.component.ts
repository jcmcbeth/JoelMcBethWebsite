/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="chat.controller.ts" />

class ChatComponent implements ng.IComponentOptions {
    public bindings: any;
    public controller: any;
    public templateUrl: string;
    public css: string;

    constructor() {
        this.bindings = {
        };
        this.controller = ChatController;
        this.templateUrl = "/app/chat/chat.html";
        this.css = "/app/chat/chat.css";
    }
}

angular
    .module("app")
    .component("jmChat", new ChatComponent());