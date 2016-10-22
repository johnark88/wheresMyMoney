myApp.controller('loansController', ['loanFactory', '$scope', '$http', function(loanFactory, $scope, $http) {
    console.log('loansController');

    //declare all loans var global
    var allLoans;
    var allLoanPayments;

    //hide all forms on page load
    $scope.editLoanForm = true;
    $scope.newLoanForm = true;
    $scope.loanPayments = true;
    $scope.currentLoanForm = true;

    $scope.init = function() {
        console.log('loans init');
        //make it an array
        $scope.allLoans = [];

        //get all loans from factory
        loanFactory.allLoans(function(loanFactory) {
            $scope.allLoans = loanFactory;
            console.log($scope.allLoans, 'this is $scope.allLoans');
        });

        //get loan payments
        loanFactory.allLoanPayments(function(loanFactory) {
            $scope.allLoanPayments = loanFactory;
            console.log($scope.allLoanPayments, 'this is $scope.allLoanPayments');
        });
    }; //end scope dot init

    //ng option select
    //on select show edit form
    $scope.loan = function(selectedLoan) {
        console.log($scope.selectedLoan);
        $scope.newLoanForm = true;
        $scope.currentLoanForm = false;
    }; //end scope.inv

    $scope.addNewLoan = function() {
        $scope.newLoanForm = false;
        $scope.editLoanForm = true;
        $scope.loanPayments = true;
        $scope.currentLoanForm = true;
        $scope.selectedLoan = "";
    }; //end addNew scope

    $scope.saveNewLoan = function() {
        console.log('save new loan');

        var newLoanToSend = {
            fromwho: $scope.loanFromWho,
            amount: $scope.loanAmount,
            duration: $scope.loanDuration,
            interestrate: $scope.loanInterestrate,
            monthlyPay: $scope.loanMonthlyPayment,
            notes: $scope.loanNotes
        }; //end object to send

        $http({
            method: 'POST',
            url: '/saveNewLoan',
            data: newLoanToSend
        }).then(function(response) {
            console.log(response);
        }); //end then on HTTP

        //reload page on click
        location.reload();

    }; //save new loan to the DB

    $scope.editLoan = function() {
        $scope.editLoanForm = false;
        $scope.loanPayments = true;
    }; //end show edit form

    $scope.showPayments = function() {
        $scope.loanPayments = false;
    }; //end show add payments and payments log



    $scope.saveEditChanges = function() {
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
            url: '/updateLoan',
            data: updatesToSend
        }).then(function(response) {
            console.log(response);
        }); //end http then
        location.reload();
    }; //end save edit changes loans

    $scope.makePayments = function() {
        console.log('making payments');

        var paymentDataToSend = {
            date: $scope.paymentDate,
            amount: $scope.paymentAmt,
            loanid: $scope.selectedLoan.loanid
        }; //end object to send

        $http({
            method: 'POST',
            url: '/savePayment',
            data: paymentDataToSend
        }).then(function(response) {
            console.log(response);
        }); //end then
        location.reload();
    }; //end make payments

    $scope.deleteLoan = function() {

        var objectToDelete = {
            loanId: $scope.selectedLoan.loanid,
            userId: $scope.selectedLoan.user_id
        }; //end object to send

        // had to use POST, when DELETE used req.body comes back undefined
        $http({
            method: 'POST',
            url: '/deleteLoan',
            data: objectToDelete
        }).then(function(response) {
            console.log(response);
        }); //end then http
        // location.reload();
    }; //end deleteLoan function

    $scope.init();
}]); //end loansController