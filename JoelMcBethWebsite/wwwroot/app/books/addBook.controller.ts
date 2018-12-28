/// <reference path="../../../client/typings/angularjs/index.d.ts" />

(function () {
    "use strict";

    angular
        .module("app")
        .controller("AddBookController", AddBookController);

    AddBookController.$inject = ["BookService", "$state"];

    function AddBookController(bookService, $state) {
        /* jshint validthis:true */
        var vm = this;
        vm.book = {};
        vm.error = null;

        vm.addBook = addBook;

        activate();

        function activate() {
        }

        function addBook(book) {
            bookService.addBook(book).then(onAddBookSuccess, onAddBookFailure);

            function onAddBookSuccess(result) {
                book.id = result.id;

                $state.go("books");
            }

            function onAddBookFailure(response) {
                vm.error = response.data.error;
            }
        }
    }
})();
