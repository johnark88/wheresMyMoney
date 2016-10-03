var myApp = angular.module('myApp', ['ngRoute']);

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
    when("/logOut", {
      templateUrl: "partials/logIn.html",
      controller:"logOutController"
    }).
    otherwise({
      redirectTo: "/"
    });
//change this so each route requries auth0 verification *****************************

}]);//end config routing
