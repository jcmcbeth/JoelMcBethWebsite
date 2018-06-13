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