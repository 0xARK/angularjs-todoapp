app.controller('ListTaskController', function($scope, mixins) {

    mixins.setLSI('value', 'name')
    $scope.todos = [{name: "todo1", content: "test"}, {name: "todo2", content: "test"}]

});

app.controller('AddTaskController', function($scope, mixins) {



});