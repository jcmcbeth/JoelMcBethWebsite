/// <reference path="../../../client/typings/angularjs/index.d.ts" />

(function () {
    "use strict";

    angular
        .module("app")
        .controller("BookDetailsController", BookDetailsController);

    BookDetailsController.$inject = ["BookService", "$stateParams"];

    function BookDetailsController(bookService, $stateParams) {
        var vm = this;

        activate();

        function activate() {
            var isbn = $stateParams.isbn;

            bookService.getBookByIsbn13(isbn).then(function (book) {
                console.log(book);
                vm.book = book;
            });
        }
    }
})();
