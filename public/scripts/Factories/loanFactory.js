myApp.factory('loanFactory', function($http) {
    console.log('in loan factory ');

    return {
        allLoans: function(callback) {
            $http({
                method: 'GET',
                url: '/loans'
            }).success(callback);
        }, //end function callback

        allLoanPayments: function(callback) {
                $http({
                    method: 'GET',
                    url: '/loanpayments'
                }).success(callback);
            } //end function callback
    }; //end return object
}); //end myApp loan factory