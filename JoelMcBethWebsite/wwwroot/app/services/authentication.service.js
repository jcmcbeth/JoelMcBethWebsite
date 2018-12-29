var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http, window, q, rootScope) {
        this.http = http;
        this.window = window;
        this.q = q;
        this.rootScope = rootScope;
        this.baseUrl = "/api/account";
    }
    AuthenticationService.prototype.isAuthenticated = function () {
        var token = this.getToken();
        if (token) {
            return true;
        }
        return false;
    };
    AuthenticationService.prototype.getToken = function () {
        return this.window.sessionStorage.getItem("token");
    };
    AuthenticationService.prototype.logout = function () {
        this.window.sessionStorage.removeItem("token");
        this.rootScope.$broadcast("unauthenticated");
        return this.q.when();
    };
    AuthenticationService.prototype.login = function (userName, password) {
        var _this = this;
        var deferred = this.q.defer();
        var url = this.baseUrl + "/login?userName=" + userName + "&password=" + password;
        this.http({
            url: url,
            method: "POST"
        }).then(function (response) {
            if (response.data.success === true) {
                var token = response.data.token;
                _this.window.sessionStorage.setItem("token", token);
                _this.rootScope.$broadcast("authenticated");
                deferred.resolve();
            }
            deferred.reject("Invalid credentials.");
        }, function () {
            deferred.reject("An error occurred when attempting to login.");
        });
        function onSuccess(response) {
            if (response.data.success === true) {
                var token = response.data.token;
                this.window.sessionStorage.setItem("token", token);
                this.rootScope.$broadcast("authenticated");
                deferred.resolve();
            }
            deferred.reject("Invalid credentials.");
        }
        function onError(response) {
            deferred.reject("An error occurred when attempting to login.");
        }
        return deferred.promise;
    };
    AuthenticationService.$inject = ["$http", "$window", "$q", "$rootScope"];
    return AuthenticationService;
}());
//# sourceMappingURL=authentication.service.js.map