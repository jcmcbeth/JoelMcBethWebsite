/// <reference path="../../../client/typings/angularjs/index.d.ts" />
/// <reference path="chat-message.ts" />
/// <reference path="chat-user.ts" />

class ChatController {
    public messages: ChatMessage[];
    public users: ChatUser[];
    public message: string;
    public collapsed: boolean;

    constructor() {
        this.message = "";
        this.messages = [
            {
                text: "hello world",
                userName: "yah_boi"
            }
        ];
        this.users = [
            {
                name: "jmcbeth"
            },
            {
                name: "mmcbeth"
            }
        ];
        this.collapsed = true;
    }

    public sendMessage() {
        const message = new ChatMessage();

        message.userName = "jmcbeth";
        message.text = this.message;

        this.message = null;

        this.messages.push(message);
    }

    public toggleCollapse() {
        console.log(this.collapsed);
        this.collapsed = !this.collapsed;
    }
}

angular
    .module("app")
    .controller("ChatController", ChatController);