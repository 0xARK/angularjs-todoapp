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

    $scope.todos = JSON.parse(mixins.getLSI('tasks'))

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
        mixins.toggleMobileMenu()
    }

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

                mixins.createTask($scope.name, $scope.description, $scope.startingDate, $scope.endingDate,
                    $scope.duration, $scope.category, $scope.url)

                $scope.name = $scope.description = $scope.startingDate = $scope.endingDate = $scope.duration =
                    $scope.category = $scope.url = $scope.error = null;

            }

        } else {

            $scope.error = "Please fill in required fields correctly.";

        }

    }

});