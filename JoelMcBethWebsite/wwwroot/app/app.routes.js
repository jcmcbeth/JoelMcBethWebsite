(function () {
    angular
        .module("app")
        .config(configure);

    function configure($routeProvider, $locationProvider) {
        $routeProvider.when("/", {
            templateUrl: "app/home/home.html"
        })
            .when("/books", {
                templateUrl: "app/books/books.html",
                controller: "BookController",
                controllerAs: "vm"
            })
            .when("/resume", {
                templateUrl: "app/resume/resume.html",
                controller: "ResumeController",
                controllerAs: "vm"
            })
            .when("/projects", {
                templateUrl: "app/projects/projects.html",
                controller: "ProjectController",
                controllerAs: "vm"
            });
    }
})();