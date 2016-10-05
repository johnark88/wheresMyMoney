myApp.controller('investmentsController',['$scope', '$http', function($scope,$http){
  console.log('investmentsController');



///*******************FORMAT INPUTS WITH $ sign*****************
///******************* Clear form on save *****************
///******************* send user thats logged to db to track data *****************
///******************* add calendar date picker to sold and new  *****************






//declare allInvestments var global
var allInvestments;

//hide all forms on page load
$scope.addNewForm = true;
$scope.editForm = true;

//Getting all investments
$scope.getInvest = function() {
  console.log('in get invest');

    //declare global var as array
    $scope.allInvestments = [];

    //http call to get investments
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
});//end then function
};//end saveChanges scope



}]);//end controller
