myApp.controller('loansController', ['$scope','$http', function($scope, $http){
  console.log('homeController');

//button to add new loans
//on new loan button click display new loan form
//$http get all loans
//display in dropdown menu
//display loan selected from dropdown in editable fashion
//button to save  edit
//button to delete current loan


//declare allInvestments var global
var allLoans;

//hide all forms on page load
$scope.editLoanForm = true;
$scope.newLoanForm = true;

$scope.init = function(){
console.log('loans init');
  //make it an array 
  $scope.allLoans = [];

$http({
  method: 'GET',
  url:''
}).then(function(response){
  console.log(response,'loans from server');
});//end then from http



};//end scope dot init

}]);
