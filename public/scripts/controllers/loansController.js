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
};//end scope dot init

//ng option select
//on select show edit form
$scope.loan = function(selectedLoan){
  console.log($scope.selectedLoan);
    $scope.editLoanForm = false;
      $scope.newLoanForm = true;
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
  interestrate: $scope.loanInterestrate,
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

  //reload page on click
  location.reload();
};//save new loan to the DB

$scope.saveEditChanges = function(){
console.log('save Edit Changes');

var updatesToSend = {
  rate: $scope.newRate,
  duration: $scope.newDuration,
  monthly: $scope.newMonthly,
  notes: $scope.newNotes,
  loanid: $scope.selectedLoan.loanid
};
  console.log(updatesToSend);
  $http({
    method: 'PUT',
    url:'/updateLoan',
    data: updatesToSend
  }).then(function(response){
    console.log(response,'edits have been saved for this loan');
  });//end http then
};//end save edit changes loans

  $scope.makePayments = function(){
    console.log('making payments');
    var paymentDataToSend = {
      date:$scope.paymentDate,
      amount: $scope.paymentAmt,
      loanid: $scope.selectedLoan.loanid
    };//end object to send

    $http({
      method: 'POST',
      url: '/savePayment',
      data: paymentDataToSend
    }).then(function(response){
      console.log(response);
    });//end then
  };//end make payments

$scope.init();
}]);
