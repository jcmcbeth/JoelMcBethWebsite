(function () {
    angular
        .module("app")
        .controller("BookController", BookController);

    BookController.$inject = ["$scope", "bookService", "authenticationService"];

    function BookController($scope, bookService, authenticationSerivce) {
        var vm = this;

        vm.pageSize = 12;
        vm.page = 1;
        vm.pageCount = 0;
        vm.pages = [];
        vm.canAdd = canAdd;

        $scope.$watch("vm.filterText", function (newValue, oldValue) {
            if (newValue !== oldValue) {
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

        function canAdd() {
            return authenticationSerivce.isAuthenticated();
        }

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