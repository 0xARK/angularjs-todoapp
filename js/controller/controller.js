/**
 * Allows to show stored tasks
 */
app.controller('ListTaskController', function($scope, mixins) {

    // setup darkMode
    $scope.darkMode = mixins.getLSI('darkMode')
    mixins.setupDarkMode();
    $scope.controlDarkMode = function() {
        $scope.darkMode === 'true' || $scope.darkMode === true ? $scope.darkMode = false : $scope.darkMode = true;
        mixins.toggleDarkMode($scope.darkMode);
    };

    // setup mobile menu
    $scope.controlMobileMenu = function() {
        mixins.toggleMobileMenu()
    }

    $scope.tasks = JSON.parse(mixins.getLSI('tasks'));
    $scope.selected = false;

    $scope.closeTask = function () {

        mixins.toggleMobileTask();

        var el = angular.element(document.querySelector('#task-list-' + $scope.selected.id));
        el.removeClass('bg-th-color dark:bg-th-color');

        $scope.selected = false;

    };

    $scope.showTask = function (id) {

        if ($scope.selected !== false) {
            $scope.closeTask();
        }

        var el = angular.element(document.querySelector('#task-list-' + $scope.selected.id));
        el.removeClass('bg-th-color dark:bg-th-color');

        var s = angular.element(document.querySelector('#task-list-' + id));
        s.addClass('bg-th-color dark:bg-th-color');

        $scope.selected = mixins.getTask(id);

        mixins.toggleMobileTask()

    };

    $scope.deleteTask = function (id) {

        tasks = mixins.getLSI('tasks');

        if (tasks !== false) {

            tasks = JSON.parse(tasks)

            $scope.closeTask();

            for (t in tasks) {
                if (tasks[t].id === id) {
                    tasks.splice(t, 1);
                    $scope.tasks = false;
                    mixins.setLSI('tasks', JSON.stringify(tasks));
                    if (tasks.length === 0) {
                        mixins.removeLSI('tasks');
                    }
                    $scope.tasks = JSON.parse(mixins.getLSI('tasks'));
                }
            }
        }

    }

    $scope.filters = [{'name':'Added', 'action':'id'}, {'name':'Name', 'action':'name'}, {'name':'Starting date', 'action':'start'}, {'name':'Ending date', 'action':'end'}, {'name':'Duration', 'action':'duration'}, {'name':'Category', 'action':'category'}];
    $scope.sort = $scope.filters[0];

    $scope.sortTask = function (sort) {

        $scope.sort = sort

    }

});

/**
 * Allows to handle task creation
 */
app.controller('AddTaskController', function($scope, mixins) {

    // setup darkMode
    $scope.darkMode = mixins.getLSI('darkMode')
    mixins.setupDarkMode();
    $scope.controlDarkMode = function() {
        $scope.darkMode === 'true' || $scope.darkMode === true ? $scope.darkMode = false : $scope.darkMode = true;
        mixins.toggleDarkMode($scope.darkMode);
    };

    // setup mobile menu
    $scope.controlMobileMenu = function() {
        mixins.toggleMobileMenu();
    };

    // handle task creation
    $scope.name = null;
    $scope.description = null;
    $scope.startingDate = null;
    $scope.endingDate = null;
    $scope.duration = null;
    $scope.category = null;
    $scope.url = null;
    $scope.error = null;
    $scope.success = null;

    $scope.addTask = function() {

        var submit = true;
        $scope.success = null;

        if ($scope.name && $scope.description && $scope.startingDate && $scope.category && $scope.url) {

            if ($scope.endingDate && $scope.duration) {
                submit = false;
                $scope.error = "Please reset ending date or duration field for choose only one.";
            } else if ($scope.endingDate && $scope.startingDate > $scope.endingDate) {
                submit = false;
                $scope.error = "You can't choose an ending date before the starting date.";
            }

            if (submit) {

                $scope.success = "Your task has been saved successfully.";
                let tasks = JSON.parse(mixins.getLSI('tasks')),
                    id = tasks === false ? 0 : tasks[0].id + 1;

                mixins.createTask(id, $scope.name, $scope.startingDate, $scope.endingDate,
                    $scope.duration, $scope.url, $scope.category, $scope.description)

                $scope.name = $scope.description = $scope.startingDate = $scope.endingDate = $scope.duration =
                    $scope.category = $scope.url = $scope.error = null;

            }

        } else {

            $scope.error = "Please fill in required fields correctly.";

        }

    };

});

/**
 * Allows to handle task edition
 */
app.controller('EditTaskController', function ($scope, $routeParams, mixins) {

    // setup darkMode
    $scope.darkMode = mixins.getLSI('darkMode')
    mixins.setupDarkMode();
    $scope.controlDarkMode = function() {
        $scope.darkMode === 'true' || $scope.darkMode === true ? $scope.darkMode = false : $scope.darkMode = true;
        mixins.toggleDarkMode($scope.darkMode);
    };

    // setup mobile menu
    $scope.controlMobileMenu = function() {
        mixins.toggleMobileMenu();
    };

    $scope.task = mixins.getTask($routeParams.id) === false ? false : mixins.getTask($routeParams.id);

    if ($scope.task === false) {
        window.location.href = '#!/';
    }

    // handle task edition
    $scope.name = $scope.task.name;
    $scope.description = $scope.task.description;
    $scope.startingDate = $scope.task.start === null ? null : new Date($scope.task.start);
    $scope.endingDate = $scope.task.end === null ? null : new Date($scope.task.end);
    $scope.duration = $scope.task.duration === null ? null : new Date($scope.task.duration);
    $scope.category = $scope.task.category;
    $scope.url = $scope.task.url;
    $scope.error = null;
    $scope.success = null;

    $scope.deleteTask = function (id) {

        id = parseInt(id)

        tasks = mixins.getLSI('tasks');

        if (tasks !== false) {

            tasks = JSON.parse(tasks)

            for (t in tasks) {
                if (tasks[t].id === id) {
                    tasks.splice(t, 1);
                    mixins.setLSI('tasks', JSON.stringify(tasks));
                    if (tasks.length === 0) {
                        mixins.removeLSI('tasks');
                    }
                }
            }
        }

    }

    $scope.editTask = function () {

        var submit = true;
        $scope.success = null;

        if ($scope.name && $scope.description && $scope.startingDate && $scope.category && $scope.url) {

            if ($scope.endingDate && $scope.duration) {
                submit = false;
                $scope.error = "Please reset ending date or duration field for choose only one.";
            } else if ($scope.endingDate && $scope.startingDate > $scope.endingDate) {
                submit = false;
                $scope.error = "You can't choose an ending date before the starting date.";
            }

            if (submit) {

                $scope.success = "Your task has been saved successfully.";

                $scope.deleteTask($routeParams.id)

                let id = parseInt($routeParams.id);

                mixins.createTask(id, $scope.name, $scope.startingDate, $scope.endingDate,
                    $scope.duration, $scope.url, $scope.category, $scope.description)

            }

        } else {

            $scope.error = "Please fill in required fields correctly.";

        }

    }

});