(function () {
    angular
        .module("app")
        .constant("sortDirections", [
            { name: "Ascending", value: 0 },
            { name: "Descending", value: 1 }
        ]);
})();