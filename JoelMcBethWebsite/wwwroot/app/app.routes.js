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
                controller: "BookController",
                controllerAs: "vm"
            })
            .state("bookDetails", {
                url: "/books/{isbn}",
                templateUrl: "app/books/book.details.html",
                controller: "BookDetailsController",
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
            });

        $urlRouterProvider.otherwise("/");
    }
})();