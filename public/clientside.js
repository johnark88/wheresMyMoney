var myApp = angular.module('myApp', ['ngRoute', 'firebase']);

myApp.config(["$routeProvider", function($routeProvider) {
    $routeProvider.
    when("/", {
        templateUrl: "/partials/logIn.html",
        controller: "logInController"
    }).
    when("/home", {
        templateUrl: "/partials/home.html",
        controller: "homeController",
        resolve: {
          // controller will not be loaded until $waitForSignIn resolves
          "firebaseUser": function($firebaseAuthService) {
            return $firebaseAuthService.$requireSignIn();
          }
        }
    }).
    when("/investments", {
        templateUrl: "/partials/investments.html",
        controller: "investmentsController",
        resolve: {
          // controller will not be loaded until $waitForSignIn resolves
          "firebaseUser": function($firebaseAuthService) {
            return $firebaseAuthService.$requireSignIn();
          }
        }
    }).
    when("/loans", {
        templateUrl: "partials/loans.html",
        controller: "loansController",
        resolve: {
          // controller will not be loaded until $waitForSignIn resolves
          "firebaseUser": function($firebaseAuthService) {
            return $firebaseAuthService.$requireSignIn();
          }
        }
    }).
    when("/BTC", {
        templateUrl: "partials/btc.html",
        controller: "btcController",
        resolve: {
          // controller will not be loaded until $waitForSignIn resolves
          "firebaseUser": function($firebaseAuthService) {
            return $firebaseAuthService.$requireSignIn();
          }
        }
    }).
    otherwise({
        redirectTo: "/"
    });
}]); //end config routing
myApp.controller('menu', [ '$scope', '$location', function($scope, $location){
    $scope.$on('$locationChangeStart', function(event) {
        $scope.view = ($location.path()).replace('/', '');
        if( $scope.view === "" ) {
            $scope.view="main";
        }
        console.log('VIEW:', $scope.view);
    });
}]);
