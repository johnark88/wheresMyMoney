myApp.controller('loansController', ['$scope','$http', function($scope, $http){
  console.log('homeController');


//on new loan button click display new loan form


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
//get all loans from server
$http({
  method: 'GET',
  url:'/loans'
}).then(function(response){
  console.log(response.data,'loans from server');
  $scope.allLoans = response.data;
});//end then from http

//ng option select
//on select show edit form
$scope.loan = function(selectedInv){
  console.log($scope.selectedLoan);
    $scope.editLoanForm = false;
      $scope.newLoanForm = true;
      //clear Inputs on new selection
      // $scope.amtInv = "";
      // $scope.profitLoss = "";
      // $scope.dateSold = "";
};//end scope.inv


};//end scope dot init
$scope.init();
}]);
