var myApp = angular.module('myApp', []);
myApp.controller('appCtl',['$scope', '$window','$http', function($scope, $window,$http) {
  $scope.getData = function(){
      $http.get('/admin/find')
      .success(function(res){
        angular.element('#modal_body').text(res[0].name);
      })
      .error(function(){
        $window.alert("err");
      })
    }
}]
)
