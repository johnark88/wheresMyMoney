console.log('sourced');

var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(["$routeProvider", function($routeProvider){
  $routeProvider.

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
    });
    otherwuse({
      redirectTo: "/home"
    });
//change this so each route 

}]);//end config routing
