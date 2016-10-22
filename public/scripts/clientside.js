var myApp = angular.module('myApp', ['ngRoute', 'firebase']);


myApp.config(["$routeProvider", function($routeProvider) {
    $routeProvider.
    when("/", {
        templateUrl: "/partials/logIn.html",
        controller: "logInController"
    }).
    when("/home", {
        templateUrl: "/partials/home.html",
        controller: "homeController"
    }).
    when("/investments", {
        templateUrl: "/partials/investments.html",
        controller: "investmentsController"
    }).
    when("/loans", {
        templateUrl: "partials/loans.html",
        controller: "loansController"
    }).
    when("/BTC", {
        templateUrl: "partials/btc.html",
        controller: "btcController"
    }).
    otherwise({
        redirectTo: "/"
    });
}]); //end config routing
