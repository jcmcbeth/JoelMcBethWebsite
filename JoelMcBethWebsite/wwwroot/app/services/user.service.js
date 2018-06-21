(function () {
    angular
        .module("app")
        .factory('userService', userService);

    userService.$inject = ["$http"];

    function userService($http) {
        var service = {
            getUsers: getUsers,
            addUser: addUser
        };

        return service;

        function getUsers(page, pageSize) {
            return $http.get("/api/users", {
                params: {
                    page: page,
                    pageSize: pageSize
                }
            }).then(onGetUsersComplete);

            function onGetUsersComplete(response) {
                return {
                    users: response.data.data,
                    pagination: response.data.pagination
                };
            }
        }

        function addUser(user) {
            return $http.post("/api/users", user)
            .then(onAddUserComplete);

            function onAddUserComplete(response) {
                return response.data;
            }
        }
    }
})();