/**
 * setup application mixins = utilities function that can be used in global scope
 */
function Mixins() {}

/**
 * Allows to set an item in the local storage
 *
 * @param name - local storage item name
 * @param value - local storage item value
 */
Mixins.prototype.setLSI = function (name, value) {
    localStorage.setItem(name, value);
}

/**
 * Allows to get a local storage item
 *
 * @param name - name of the local storage item to get
 * @returns {boolean|string} - local storage item if exists or false
 */
Mixins.prototype.getLSI = function (name) {
    return localStorage.getItem(name) === null ? false : localStorage.getItem(name);
}

/**
 * Allows to remove an item from the local storage
 *
 * @param name - local storage item to remove
 */
Mixins.prototype.removeLSI = function (name) {
    localStorage.removeItem(name);
}

/**
 * Allows to setup darkMode when application is loading
 */
Mixins.prototype.setupDarkMode = function() {

    let darkMode = this.getLSI('darkMode');
    this.toggleDarkMode(darkMode);

}

/**
 * Allows to set or reset the darkMode
 *
 * @param darkMode - true if darkMode must be enabled or false if it must be disabled
 */
Mixins.prototype.toggleDarkMode = function(darkMode) {

    this.setLSI('darkMode', darkMode);

    var el = angular.element(document.querySelector('html'));

    darkMode === 'true' || darkMode === true ? el.addClass('dark') : el.removeClass('dark');

}

/**
 * Allows to show or hide mobile menu on button click
 */
Mixins.prototype.toggleMobileMenu = function() {

    var el = angular.element(document.querySelector('#mobile-menu'));
    var openIcon = angular.element(document.querySelector('#open-menu'));
    var closeIcon = angular.element(document.querySelector('#close-menu'));
    var show = document.querySelector('#mobile-menu').classList.contains('hidden')

    if (show) {
        el.removeClass('hidden');
        openIcon.addClass('hidden');
        closeIcon.removeClass('hidden');
    } else {
        el.addClass('hidden');
        openIcon.removeClass('hidden')
        closeIcon.addClass('hidden')
    }

}

/**
 * Allows to create a task in the local storage
 *
 * @param name - name of the task
 * @param startDate - starting date of the task
 * @param endDate - ending date of the task
 * @param duration - duration of the task
 * @param url - url of the task
 * @param category - category of the task
 * @param description - description of the task
 */
Mixins.prototype.createTask = function(name, startDate, endDate, duration, url, category, description) {

    let tasks = this.getLSI('tasks');
    if (!tasks) tasks = []

    tasks.push({'name': name, 'start': startDate, 'end': endDate, 'duration': duration, 'url': url,
        'category': category, 'description': description})

    localStorage.setItem('tasks', JSON.stringify(tasks))

}

/**
 * Following code allows to setup AngularJS
 */

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