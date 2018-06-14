(function () {
    "use strict";

    angular
        .module("app")
        .controller("BookDetailsController", BookDetailsController);

    BookDetailsController.$inject = ["bookService", "$stateParams"];

    function BookDetailsController(bookService, $stateParams) {
        var vm = this;

        activate();

        function activate() {
            var isbn = $stateParams.isbn;

            console.log(isbn);

            bookService.getBookByIsbn13(isbn).then(function (book) {
                console.log(book);
                vm.book = book;
            });
        }
    }
})();
