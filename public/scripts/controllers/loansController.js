myApp.controller('loansController', ['$scope','$http', function($scope, $http){
  console.log('homeController');

//declare all loans var global
var allLoans;
var allLoanPayments;

//hide all forms on page load
$scope.editLoanForm = true;
$scope.newLoanForm = true;
$scope.loanPayments = true;
$scope.currentLoanForm = true;

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

        //get loan payments
        $http({
          method: 'GET',
            url:'/loanpayments'
            }).then(function(response){
              $scope.allLoanPayments = response.data;
                console.log($scope.allLoanPayments,'payments from server');
              });
            };//end scope dot init

  //ng option select
  //on select show edit form
  $scope.loan = function(selectedLoan){
    console.log($scope.selectedLoan);
        $scope.newLoanForm = true;
            $scope.currentLoanForm = false;
          // if (loanid has loan payments  ) {
          //     load loanPayments display
          // }else {
          //   hide tit
          // }
  };//end scope.inv

  $scope.addNewLoan = function(){
    $scope.newLoanForm = false;
      $scope.editLoanForm = true;
        $scope.loanPayments = true;
          $scope.currentLoanForm =true;
            $scope.selectedLoan = "";
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

$scope.editLoan = function(){
  $scope.editLoanForm = false;
  $scope.loanPayments = true;
};//end show edit form

$scope.showPayments = function(){
  $scope.loanPayments = false;
};//end show add payments and payments log



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
            location.reload();
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
            location.reload();
        };//end make payments

$scope.init();
}]);
