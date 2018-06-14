(function () {
    angular
        .module("app")
        .factory("bookService", bookService);

    bookService.$inject = ["$http"];

    function bookService($http) {
        return {
            getBooks: getBooks,
            getBookByIsbn13: getBookByIsbn13
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

        function getBookByIsbn13(isbn) {
            return $http.get("/api/books", {
                params: {
                    isbn: isbn
                }
            }).then(getBookComplete);

            function getBookComplete(response) {
                return response.data;
            }
        }
    }
})();