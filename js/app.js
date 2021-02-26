// setup application mixins
function Mixins() {}

Mixins.prototype.setLSI = function (name, value) {
    localStorage.setItem(name, value);
}

Mixins.prototype.getLSI = function (name) {
    return localStorage.getItem(name) === null ? false : localStorage.getItem(name);
}

Mixins.prototype.removeLSI = function (name) {
    localStorage.removeItem(name);
}

Mixins.prototype.setupDarkMode = function() {

    let darkMode = this.getLSI('darkMode');
    this.toggleDarkMode(darkMode);

}

Mixins.prototype.toggleDarkMode = function(darkMode) {

    this.setLSI('darkMode', darkMode);

    var el = angular.element(document.querySelector('html'));

    darkMode === 'true' || darkMode === true ? el.addClass('dark') : el.removeClass('dark');

}

Mixins.prototype.createTask = function(name, startDate, endDate, duration, url, category, description) {

    let tasks = this.getLSI('tasks');
    if (!tasks) tasks = []

    tasks.push({'name': name, 'start': startDate, 'end': endDate, 'duration': duration, 'url': url,
        'category': category, 'description': description})

    localStorage.setItem('tasks', JSON.stringify(tasks))

}

// create angular module
var app = angular.module("todoapp", ["ngRoute"]);
// use mixins with our application
app.factory("mixins", [function () { return new Mixins()}]);
// setup angular routes
app.config(function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/' , {
            templateUrl: "partials/list_task.html",
            controller: "ListTaskController"
        })
        .when('/add', {
            templateUrl: "partials/add_task.html",
            controller: "AddTaskController"
        })
        .otherwise({
            redirectTo: "/"
        });

});