function Mixins() {}

Mixins.prototype.setLSI = function (name, value) {
    localStorage.setItem(name, value)
}

Mixins.prototype.getLSI = function (name) {
    return localStorage.getItem(name)
}

Mixins.prototype.removeLSI = function (name) {
    localStorage.removeItem(name)
}

var app = angular.module("todoapp", ["ngRoute"]);

app.factory("mixins", [function () { return new Mixins()}]);

app.config(function($routeProvider) {

    $routeProvider
        .when('/' , {
            templateUrl: "partials/list.html",
            controller: "ListTaskController"
        })
        .otherwise({
            redirectTo: "/"
        });

});