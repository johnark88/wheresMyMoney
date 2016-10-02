console.log('sourced');

var myApp = angular.module('myapp', []);

myApp.controller('homeController ', ['$scope', function($scope){
  console.log('NG');
}]);
