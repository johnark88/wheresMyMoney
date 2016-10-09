var myApp = angular.module('myApp', ['ngRoute']);
// if (userid == undefined) {
// $scope.role = guest
// }else {
//   $scope.role =user
// }
myApp.config(["$routeProvider", function($routeProvider){
  $routeProvider.
    when("/", {
      templateUrl:"/partials/logIn.html",
      controller: "logInController"
    }).
    when("/home", {
      templateUrl:"/partials/home.html",
      controller: "homeController"
    }).
    when("/investments", {
      templateUrl: "/partials/investments.html",
      controller: "investmentsController"
    }).
    when("/loans",{
      templateUrl: "partials/loans.html",
      controller: "loansController"
    }).
    otherwise({
      redirectTo: "/"
    });
//change this so each route requries auth0 verification *****************************

}]);//end config routing
