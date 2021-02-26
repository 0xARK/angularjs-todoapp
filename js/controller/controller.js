app.controller('ListTaskController', function($scope, mixins) {

    // setup darkMode
    $scope.darkMode = mixins.getLSI('darkMode')
    mixins.setupDarkMode();
    $scope.controlDarkMode = function() {
        $scope.darkMode === 'true' || $scope.darkMode === true ? $scope.darkMode = false : $scope.darkMode = true;
        mixins.toggleDarkMode($scope.darkMode);
    };

    $scope.todos = [{name: "todo1", content: "test"}, {name: "todo2", content: "test"}];

});

app.controller('AddTaskController', function($scope, mixins) {

    // setup darkMode
    $scope.darkMode = mixins.getLSI('darkMode')
    mixins.setupDarkMode();
    $scope.controlDarkMode = function() {
        $scope.darkMode === 'true' || $scope.darkMode === true ? $scope.darkMode = false : $scope.darkMode = true;
        mixins.toggleDarkMode($scope.darkMode);
    };

});