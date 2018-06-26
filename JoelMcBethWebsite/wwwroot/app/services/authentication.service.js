(function () {
    "use strict";

    angular
        .module("app")
        .factory("authenticationService", authenticationService);

    authenticationService.$inject = ["$http", "$window"];

    function authenticationService($http, $window) {
        var service = {
            login: login
        };

        return service;

        function login(userName, password) {
            $http({
                url: "/api/account/login",
                method: "POST",
                data: {
                    userName: userName,
                    password: password
                }
            }).then(function (response) {
                if (response.data.success === true) {
                    let token = response.data.token;

                    $window.sessionStorage.setItem("token", token);

                    return true;
                }

                return false;
            });
        }
    }
})();