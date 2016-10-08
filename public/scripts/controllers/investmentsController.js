myApp.controller('investmentsController',['$scope', '$http', function($scope,$http){
  console.log('investmentsController');

//declare allInvestments var global
var allInvestments;

//hide all forms on page load
$scope.addNewForm = true;
$scope.editForm = true;

//Getting all investments
$scope.init = function() {
  console.log('in get invest');

    //declare global var as array
    $scope.allInvestments = [];

    //http call to get investments
    $http({
      method: 'GET',
      url: '/investments'
        }).then(function(response){
          $scope.allInvestments = response.data;
  });//end then
};//end get.invest

//ng option select
//on select show edit form
$scope.inv = function(selectedInv){
  console.log($scope.selectedInv);
    $scope.editForm = false;
      $scope.addNewForm = true;
      //clear Inputs on new selection
      $scope.amtInv = "";
      $scope.profitLoss = "";
      $scope.dateSold = "";
};//end scope.inv

//on add new show form
//allow edit of all fields
$scope.addNew = function(){
  $scope.addNewForm = false;
  $scope.editForm = true;
};//end addNew scope

//save new Investment
$scope.saveNewInv = function(){

  //new object to send to DB
  var newInv = {
    bank: $scope.invBank,
    amountinvested: $scope.invAmountInvested,
    stockSymbol: $scope.invStockSymbol,
    pl:$scope.invProfitLoss,
    date: $scope.invBought
  };
//log object
console.log(newInv,'ObjectToSend');

$http({
    method:'POST',
    url: '/newInv',
    data: newInv
  }).then(function(response){
  console.log(response);
  //clear input fields
  $scope.invBank = "";
  $scope.invAmountInvested = "";
  $scope.invStockSymbol = "";
  $scope.invProfitLoss = "";
  $scope.invBought = "";
});//end then function
};//end saveNewInv scope


//save changes to investments and send to DB
$scope.saveEditChanges = function(){

var editsToSend = {
  amountinvested: $scope.amtInv,
  profitLoss: $scope.profitLoss,
  dateSold: $scope.dateSold,
  invId: $scope.selectedInv.investmentid
};//end object to send
console.log(editsToSend, 'EDITS EDITS ');

  $http({
    method: 'PUT',
    url: '/updateInv',
    data: editsToSend
  }).then(function(response){
    console.log(response);
    //clear input fields
    $scope.amtInv = "";
    $scope.profitLoss = "";
    $scope.dateSold = "";
    $scope.selectedInv.investmentid = "";
  });//end then
};//end save changes to DB record

$scope.DeleteInvest = function(){

var objectToDelete = {
  amountinvested: $scope.amtInv,
  profitLoss: $scope.profitLoss,
  dateSold: $scope.dateSold,
  invId: $scope.selectedInv.investmentid
};//end object to send
console.log('delete delete  clientside : ', objectToDelete);
  $http({
    method: 'DELETE',
    url:'/deleteInv',
    data: objectToDelete
  }).then(function(response){
    console.log(response);
  });//end then for http
};//end delete function

//get all investments on load
$scope.init();
}]);//end controller
