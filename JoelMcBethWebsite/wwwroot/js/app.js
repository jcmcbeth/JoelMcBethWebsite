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

    BookController.$inject = ["$scope", "bookService"];

    function BookController($scope, bookService) {
        var vm = this;

        vm.pageSize = 10;
        vm.page = 1;
        vm.pageCount = 0;
        vm.pages = [];

        $scope.$watch("vm.filterText", function (newValue, oldValue) {
            if (newValue != oldValue) {
                vm.page = 1;
                updateBooks();
            }
        });

        activate();

        vm.selectPage = function (page) {
            if (page <= vm.pageCount || page >= 1) {
                vm.page = page;

                updateBooks();
            }
        };

        function activate() {
            return updateBooks();
        }

        function updateBooks() {
            return bookService.getBooks(vm.filterText, vm.page, vm.pageSize).then(function (data) {
                vm.books = data.books;
                vm.pageCount = data.pagination.pages;

                updatePages();
            });
        }

        function updatePages() {
            // I couldn't find a simple way to do a repeat over a range of
            // numbers. I think the easiest way was to just create an array
            // of the numbers.
            vm.pages = new Array(vm.pageCount);
            for (var i = 0; i < vm.pageCount; i++) {
                vm.pages[i] = i + 1;
            }
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

        function getBooks(filter, page, pageSize) {
            return $http.get("/api/books", {
                params: {
                    filter: filter,
                    page: page,
                    pageSize: pageSize
                }
            }).then(getBooksComplete);

            function getBooksComplete(response) {                
                return {
                    books: response.data.data,
                    pagination: response.data.pagination
                };
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