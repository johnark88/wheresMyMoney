myApp.controller('investmentsController',['$scope', '$http', function($scope,$http){
  console.log('investmentsController');
var allInvestments;
$scope.getInvest = function() {
console.log('in get invest');

  $scope.allInvestments = [];

  $http({
    method: 'GET',
    url: '/investments'
  }).then(function(response){
    // console.log('WORK WORK WORK', response);
    $scope.allInvestments = response.data;
    // console.log('WORK AGAIN',$scope.allInvestments);
  });//end then
};//end get.invest


}]);//end controller
