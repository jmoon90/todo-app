function getMonthStrings() {
    return [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
}
 
function getCurrentFormattedDate(date) {
    return (function () {
        return getMonthStrings()[this.getMonth()] + ' ' + (function (d) {
            var s = d.toString(), l = s[s.length - 1];
            return s + (['st', 'nd', 'rd'][l - 1] || 'th');
        })(this.getDate()) + ', ' + this.getFullYear() + ' ' + ('0' + (this.getHours() % 12 || 12)).slice(-2) + ':' + ('0' + this.getMinutes()).slice(-2) + ':' + ('0' + this.getSeconds()).slice(-2) + ' ' + (this.getHours() >= 12 ? 'PM' : 'AM');
    }).call(date || new Date());
}

var todoLists = angular.module('todoLists', [])

todoLists.controller("todoListController", ['$scope', '$http',  function($scope, $http) {
  $scope.newList = '';
  $scope.checkbox = {
    value1 : false
  };

  $scope.completeTasks = [];


  $http.get("/todo_lists/todo_lists_json")
    .success(function(result) {
       $scope.todoLists = result[0].incomplete
       $scope.completeTasks = result[0].complete
     });

  $scope.addTask = function() {
    $http.post("/todo_lists", { list: $scope.newList, completed: false })
      .success(function(result) {
         $scope.todoLists = result
         $scope.newList = '';
       })
       .error(function(data, status, headers, config) {
         console.log("AJAX failed!");
       });
  }

  $scope.completeTask = function(key) {
    var id = $scope.todoLists[key].id
    var completedTime = getCurrentFormattedDate(new Date)
    $http.put("/todo_lists/"+ id, { completed: true, completed_time: completedTime })
      .success(function(result) {
         $scope.todoLists = result[0].incomplete
         $scope.completeTasks = result[0].complete
        console.log($scope.completeTasks)
      });
  }
}]);
