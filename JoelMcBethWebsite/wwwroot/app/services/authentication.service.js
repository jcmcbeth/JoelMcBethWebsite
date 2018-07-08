(function () {
    "use strict";

    angular
        .module("app")
        .factory("authenticationService", authenticationService);

    authenticationService.$inject = ["$http", "$window", "$q", "$rootScope"];

    function authenticationService($http, $window, $q, $rootScope) {
        const baseUrl = "/api/account";

        var service = {
            isAuthenticated: isAuthenticated,
            getToken: getToken,
            login: login,
            logout: logout
        };

        return service;

        function isAuthenticated() {
            let token = getToken();

            if (token) {
                return true;
            }

            return false;
        }

        function getToken() {
            return $window.sessionStorage.getItem("token");
        }

        function login(userName, password) {
            let deferred = $q.defer();
            let url = baseUrl + "/login?userName=" + userName + "&password=" + password;

            console.log("Using username " + userName + " and password " + password + ".");

            $http({
                url: url,
                method: "POST"
            }).then(onSuccess, onError);

            function onSuccess(response) {
                if (response.data.success === true) {
                    let token = response.data.token;

                    $window.sessionStorage.setItem("token", token);

                    $rootScope.$broadcast("authenticated");

                    deferred.resolve();
                }

                deferred.reject("Invalid credentials.");
            }

            function onError(response) {
                deferred.reject("An error occurred when attempting to login.");
            }

            return deferred.promise;
        }

        function logout() {
            let deferred = $q.defer();

            $window.sessionStorage.removeItem("token");
            $rootScope.$broadcast("unauthenticated");
            deferred.resolve();   

            return deferred.promise;             
        }
    }
})();