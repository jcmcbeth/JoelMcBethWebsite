/// <reference path="../../client/typings/angularjs/index.d.ts" />

(function () {
    angular
        .module("app")
        .config(configure);

    configure.$inject = ["$urlRouterProvider", "$stateProvider" ];

    function configure($urlRouterProvider, $stateProvider) {
        $stateProvider
            .state("home", {
                url: '/',
                templateUrl: "app/home/home.html"
            })
            .state("books", {
                url: '/books',
                templateUrl: "app/books/books.html",
                css: "app/books/books.css",
                controller: "BookController",
                controllerAs: "vm"
            })
            .state("bookDetails", {
                url: "/books/{isbn}",
                templateUrl: "app/books/book.details.html",
                controller: "BookDetailsController",
                controllerAs: "vm"
            })
            .state("addBook", {
                url: "/books/add",
                templateUrl: "app/books/addBook.html",
                controller: "AddBookController",
                controllerAs: "vm"
            })
            .state("resume", {
                url: "/resume",
                templateUrl: "app/resume/resume.html",
                controller: "ResumeController",
                controllerAs: "vm"
            })
            .state("projects", {
                url: "/projects",
                templateUrl: "app/projects/projects.html",
                controller: "ProjectController",
                controllerAs: "vm"
            })
            .state("login", {
                url: "/login",
                templateUrl: "app/account/login.html",
                controller: "LoginController as vm"
            })
            .state("logout", {
                url: "/logout",
                templateUrl: "app/account/logout.html",
                controller: "LogoutController as vm"
            })
            .state("register", {
                url: "/register",
                templateUrl: "app/account/register.html",
                controller: "RegisterController as vm"
            })
            .state("media", {
                url: "/media",
                templateUrl: "app/media/media.html",
                controller: "MediaController as vm"
            })
            .state("resources", {
                url: "/resources",
                templateUrl: "app/resources/resources.html",
                controller: "ResourceController as vm"
            })
            .state("infantry", {
                url: "/infantry",
                templateUrl: "app/infantry/infantry.html"
            })
            .state("infantry-browser", {
                url: "/infantry/browser",
                templateUrl: "app/infantry/infantry-browser.html",
                controller: "InfantryBrowserController as vm"
            })
            .state("users", {
                url: "/users",
                templateUrl: "app/users/users.html",
                controller: "UsersController as vm",
                data: {
                    requireAuthentication: true
                }
            })
            .state("addUser", {
                url: "/users/add",
                templateUrl: "app/users/addUser.html",
                controller: "AddUserController as vm",
                data: {
                    requireAuthentication: true
                }
            })
            .state("misc", {
                url: "/misc",
                templateUrl: "app/home/misc.html"
            })
            .state("base64-converter", {
                url: "/base64-converter",
                templateUrl: "app/tools/base64.html",
                controller: "Base64Controller as vm"
            })
            .state("adblock", {
                url: "/adblock",
                templateUrl: "app/adblock/adblock.html",
                css: "app/adblock/adblock.css"
            })
            .state("exception-formatter", {
                url: "/exception-formatter",
                template: "<exception-formatter></exception-formatter>"
            })
            .state("hash-generator", {
                url: "/hash-generator",
                templateUrl: "app/tools/hash.html",
                controller: "HashController as vm"
            })
            .state("cameras", {
                url: "/cameras",
                templateUrl: "app/cameras/camera.html",
                controller: "CameraController as vm",
                css: "app/cameras/camera.css"
            })
            .state("window-sticker-lookup", {
                url: "/window-sticker-lookup",
                templateUrl: "app/windowsticker/window-sticker.html",
                controller: "WindowStickerController as vm"
            });

        $urlRouterProvider.otherwise("/");
    }
})();