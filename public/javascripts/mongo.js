var myApp = angular.module('myApp', ['ngRoute','ngAnimate']);
myApp.controller('appCtl',['$scope', '$window','$http', function($scope, $window,$http) {
  $scope.insertmsg = function(){
      $http.post('/mc/insert_chatlog',{'message' : $scope.msg})
      .success(function(res){
        $window.alert("ok");
        //angular.element('#modal_body').text(res[0].name);
      })
      .error(function(){
        $window.alert("err");
      })
    }
}]
)
