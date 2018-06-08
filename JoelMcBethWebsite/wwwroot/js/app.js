/// <reference path="angular.min.js" />
/// <reference path="angular-route.js" />

// app.module.js

(function () {
    angular.module('app', ["ngRoute"]);
})();


// book.controller.js

(function () {
    angular
        .module("app")
        .controller("BookController", BookController);

    BookController.$inject = ["bookService"];

    function BookController(bookService) {
        var vm = this;

        activate();

        function activate() {
            return bookService.getBooks().then(function (books) {
                vm.books = books;
            });
        }
    }
})();

// resume.controller.js

(function () {
    angular
        .module("app")
        .controller("ResumeController", ResumeController);

    ResumeController.$inject = ["$http"];

    function ResumeController($http) {
        var vm = this;

        activate();

        function activate() {
            return $http.get("resume.json").then(function (response) {
                vm.resume = response.data;
            });
        }
    }
})();

// project.controller.js

(function () {
    angular
        .module("app")
        .controller("ProjectController", ProjectController);

    ProjectController.$inject = ["$http", "projectService"];

    function ProjectController($http, projectService) {
        var vm = this;

        activate();

        function activate() {
            return projectService.getProjects().then(function (projects) {

                console.log(projects);
                vm.projects = projects;
            });
        }
    }
})();


// app.routes.js

(function () {
    angular
        .module("app")
        .config(configure);

    function configure($routeProvider, $locationProvider) {
        $routeProvider.when("/", {
            templateUrl: "home.html"
        })
        .when("/books", {
            templateUrl: "books.html",
            controller: "BookController",
            controllerAs: "vm"
        })
        .when("/resume", {
            templateUrl: "resume.html",
            controller: "ResumeController",
            controllerAs: "vm"
        })
        .when("/projects", {
            templateUrl: "projects.html",
            controller: "ProjectController",
            controllerAs: "vm"
        });
    }
})();

// book.service.js

(function () {
    angular
        .module("app")
        .factory("bookService", bookService);

    bookService.$inject = ["$http"];

    function bookService($http) {
        return {
            getBooks: getBooks
        };

        function getBooks() {
            return $http.get("/api/books").then(getBooksComplete);

            function getBooksComplete(response) {                
                return response.data;
            }
        }
    }
})();

// project.service.js

(function () {
    angular
        .module("app")
        .factory("projectService", projectService);

    projectService.$inject = ["$http"];

    function projectService($http) {
        return {
            getProjects: getProjects
        };

        function getProjects() {
            return $http.get("/api/projects").then(getProjectsComplete);

            function getProjectsComplete(response) {
                return response.data;
            }
        }
    }
})();