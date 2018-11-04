(function () {
    angular
        .module("app")
        .controller("BookController", BookController);

    BookController.$inject = ["$scope", "bookService", "authenticationService", "sortDirections"];

    function BookController($scope, bookService, authenticationSerivce, sortDirections) {
        var vm = this;

        vm.pageSize = 12;
        vm.page = 1;
        vm.pageCount = 0;
        vm.pages = [];
        vm.canAdd = canAdd;
        vm.selectPage = selectPage;
        vm.filterBooks = filterBooks;
        vm.updateBooks = updateBooks;
        vm.sort = 0;
        vm.sortDirection = 0;
        vm.sortDirections = sortDirections;

        vm.sortOptions = [
            { name: "None", value: 0 },
            { name: "Title", value: 1 }
        ];

        activate();

        function filterBooks() {
            vm.page = 1;
            updateBooks();
        }

        function selectPage(page) {
            if (page <= vm.pageCount || page >= 1) {
                vm.page = page;

                updateBooks();
            }
        }

        function canAdd() {
            return authenticationSerivce.isAuthenticated();
        }

        function activate() {
            return updateBooks();
        }

        function updateBooks() {
            return bookService.getBooks(vm.filterText, vm.page, vm.pageSize, vm.sort, vm.sortDirection).then(function (data) {
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