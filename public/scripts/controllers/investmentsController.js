myApp.controller('investmentsController', ['invFactory', '$scope', '$http', function(invFactory, $scope, $http) {
    console.log('investmentsController');

    //hide all forms on page load
    $scope.addNewForm = true;
    $scope.editForm = true;
    $scope.currentInv = true;


    var allInvestments;


    $scope.init = function() {

        console.log('in get invest');

        //get all investments from factory
        invFactory.allInvestments(function(invFactory) {
            $scope.allInvestments = invFactory;
            console.log($scope.allInvestments, 'this is $scope.allInvestments');
        });
    }; //end get.invest

    //ng option select
    //on select show edit form
    $scope.inv = function(selectedInv) {
        console.log($scope.selectedInv);
        $scope.editForm = false;
        $scope.addNewForm = true;
        $scope.currentInv = false;

        //clear Inputs on new selection
        $scope.amtInv = "";
        $scope.profitLoss = "";
        $scope.dateSold = "";
    }; //end scope.inv

    //on add new show form
    //allow edit of all fields
    $scope.addNew = function() {
        $scope.addNewForm = false;
        $scope.editForm = true;
        $scope.currentInv = true;
        $scope.selectedInv = "";
    }; //end addNew scope

    //save new Investment
    $scope.saveNewInv = function() {

        //new object to send to DB
        var newInv = {
            bank: $scope.invBank,
            amountinvested: $scope.invAmountInvested,
            stockSymbol: $scope.invStockSymbol,
            pl: $scope.invProfitLoss,
            date: $scope.invBought
        };
        //log object

        $http({
            method: 'POST',
            url: '/newInv',
            data: newInv
        }).then(function(response) {
            console.log(response);

            //clear input fields
            $scope.invBank = "";
            $scope.invAmountInvested = "";
            $scope.invStockSymbol = "";
            $scope.invProfitLoss = "";
            $scope.invBought = "";
        }); //end then function
        //reload page on click
        location.reload();
    }; //end saveNewInv scope


    //save changes to investments and send to DB
    $scope.saveEditChanges = function() {

        var editsToSend = {
            amountinvested: $scope.amtInv,
            profitLoss: $scope.profitLoss,
            dateSold: $scope.dateSold,
            invId: $scope.selectedInv.investmentid
        }; //end object to send

        $http({
            method: 'PUT',
            url: '/updateInv',
            data: editsToSend
        }).then(function(response) {
            console.log(response);

            //clear input fields
            $scope.amtInv = "";
            $scope.profitLoss = "";
            $scope.dateSold = "";
            $scope.selectedInv.investmentid = "";
        }); //end then
        //reload page on click
        location.reload();
    }; //end save changes to DB record

    $scope.deleteInvest = function() {

        var objectToDelete = {
            amountinvested: $scope.amtInv,
            profitLoss: $scope.profitLoss,
            dateSold: $scope.dateSold,
            invId: $scope.selectedInv.investmentid
        }; //end object to send


        $http({
            //this is a post because 'DELETE' was not working
            method: 'POST',
            url: '/deleteInv',
            data: objectToDelete
        }).then(function(response) {
            console.log(response);
        }); //end then for http
        //reload page on click
        location.reload();
    }; //end delete function

    //get all investments on load
    $scope.init();
}]); //end controller