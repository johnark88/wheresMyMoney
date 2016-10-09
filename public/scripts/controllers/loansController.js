myApp.controller('loansController', ['$scope','$http', function($scope, $http){
  console.log('homeController');


//on new loan button click display new loan form


//display loan selected from dropdown in editable fashion
//button to save  edit
//button to delete current loan


//declare all loans var global
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
$scope.loan = function(selectedLoan){
  console.log($scope.selectedLoan);
    $scope.editLoanForm = false;
      $scope.newLoanForm = true;
      //clear Inputs on new selection
      // $scope.amtInv = "";
      // $scope.profitLoss = "";
      // $scope.dateSold = "";
};//end scope.inv

$scope.addNewLoan = function(){
  $scope.newLoanForm = false;
  $scope.editLoanForm = true;
};//end addNew scope

$scope.saveNewLoan = function(){
  console.log('save new loan');

var newLoanToSend = {
  fromwho: $scope.loanFromWho,
  amount:$scope.loanAmount,
  duration:$scope.loanDuration,
  intrestRate: $scope.loanIntrestRate,
  monthlyPay: $scope.loanMonthlyPayment,
  notes:$scope.loanNotes
};//end object to send

  $http({
    method:'POST',
    url: '/saveNewLoan',
    data: newLoanToSend
  }).then(function(response){
    console.log(response);
  });//end then on HTTP
};//save new loan to the DB



};//end scope dot init
$scope.init();
}]);
