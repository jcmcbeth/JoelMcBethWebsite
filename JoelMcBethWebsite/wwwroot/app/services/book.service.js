(function () {
    angular
        .module("app")
        .factory("bookService", bookService);

    bookService.$inject = ["$http"];

    function bookService($http) {
        var baseUrl = "/api/books";

        return {
            addBook: addBook,
            getBooks: getBooks,
            getBookByIsbn13: getBookByIsbn13
        };

        function getBooks(filter, page, pageSize, sort, sortDirection) {
            return $http.get(baseUrl, {
                params: {
                    filter: filter,
                    page: page,
                    pageSize: pageSize,
                    sort: sort,
                    sortDirection: sortDirection
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
            var url = baseUrl + isbn;
            return $http.get(url).then(getBookComplete);

            function getBookComplete(response) {
                return response.data;
            }
        }

        function addBook(book) {
            var url = baseUrl;

            return $http.post(url, book).then(addBookSuccess);

            function addBookSuccess(response) {
                return response.data;
            }
        }
    }
})();