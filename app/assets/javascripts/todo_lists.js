var todoLists = angular.module('todoLists', [])

todoLists.controller("todoListController", ['$scope', '$http',  function($scope, $http) {
  $scope.newList = '';

  $http.get("/todo_lists/todo_lists_json")
    .success(function(result) {
      $scope.todoLists = result;
     })



  $scope.newList = '';
  $scope.addTask = function() {
    $http.post("/todo_lists", { list: $scope.newList, completed: false })
      .success(function(success) {
         $scope.todoLists = success.list;
         $scope.newList = '';
       })
       .error(function(data, status, headers, config) {
         console.log("AJAX failed!");
       });
  }
}]);
