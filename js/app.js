var app = angular.module("todoapp", ["ngRoute"]);
app.config(function($routeProvider) {
    'use strict';
    $routeProvider
        .when('/' , {
            templateUrl: "partials/list.html",
            controller: "ListController"
        })
        .otherwise({
            redirectTo: "/"
        });
});