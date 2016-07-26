var app = angular.module('myApp', ['ngRoute','ngAnimate'])
 app.config(function ($routeProvider) {
//Module의 config API를 사용하면 서비스 제공자provider에 접근할 수 있다. 여기선 $route 서비스 제공자를 인자로 받아온다.
  $routeProvider
//$routeProvider의 when 메소드를 이용하면 특정 URL에 해당하는 라우트를 설정한다. 이때 라우트 설정객체를 전달하는데 <ng-view>태그에 삽입할 탬플릿에 해당하는 url을 설정객체의 templateUrl 속성으로 정의한다.
    .when('/main', {templateUrl: '/main'})
    .when('/chat', {templateUrl: '/chat'})
    .when('/ani', {templateUrl: '/ani'})
//라우트 설정객체에 controller 속성을 통하여 해당 화면에 연결되는 컨트롤러 이름을 설정할 수 있다.
    .otherwise({redirectTo: '/'});
//otherwise 메소드를 통하여 브라우저의 URL이 $routeProivder에서 정의되지 않은 URL일 경우에 해당하는 설정을 할 수 있다. 여기선 ‘/home’으로 이동시키고 있다.
  })
  app.controller('appCtl',['$scope', '$window','$http','socket','$log',  function($scope, $window,$http,socket,$log) {
    $scope.chat_logs = [];

    socket.emit('init_chat_log');

    $scope.insertmsg_angular = function(){
      socket.emit('insert_chatlog',{'message' : $scope.message,'user':'admin'});
      $scope.chat_logs.push({"message": $scope.message})
        $scope.message ="";
      }

      socket.on('new_chat_log', function (data) {
        $scope.chat_logs.push({"message": data.message})
      });

      socket.on('chat_logs', function (data) {
        $scope.chat_logs = data;
        $scope.chat_logs.reverse();
      });

  }]
)
app.controller('aniCtl', function($scope) {
  $scope.names = ["a","b","c","d"]

  $scope.addelement = function(el){
    $scope.names.push(el)
  }
})


app.factory('socket', function ($rootScope) {
  var socket = io.connect('http://ec2-54-199-240-31.ap-northeast-1.compute.amazonaws.com');
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
})
  app.directive('myEnter', function () {
      return function (scope, element, attrs) {
          element.bind("keydown", function (event) {
              if(event.which === 13) {
                  scope.$apply(function (){
                      scope.$eval(attrs.myEnter);
                  });

                  event.preventDefault();
              }
          });
      };
  })
