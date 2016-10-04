myApp.controller('investmentsController',['$scope', '$http', function($scope,$http){
  console.log('investmentsController');

$scope.getInvest = function() {
console.log('in get invest');
  $http({
    method: 'GET',
    url: '/investments'
  }).then(function(response){
    console.log('WORK WORK WORK', response);
  });

};

}]);//end controller
