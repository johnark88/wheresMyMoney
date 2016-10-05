myApp.controller('investmentsController',['$scope', '$http', function($scope,$http){
  console.log('investmentsController');
var allInvestments;
$scope.addNewForm = true;
$scope.editForm = true;

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

//ng option select
//on select show edit form
$scope.inv = function(selectedInv){
console.log(selectedInv);
console.log($scope.selectedInv);
$scope.editForm = false;
$scope.addNewForm = true;
};//end scope.inv

//on add new show form
//allow edit of all fields
$scope.addNew = function(){
$scope.addNewForm = false;
$scope.editForm = true;
};//end addNew scope



}]);//end controller
