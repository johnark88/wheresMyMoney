myApp.controller('btcController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
    console.log('btcController');



    $scope.init = function() {
        console.log('here');

        $http({
            method: 'GET',
            url: 'http://api.coindesk.com/v1/bpi/currentprice.json',
        }).then(function(response) {
            console.log('BTC', response.data.bpi.USD);
            $scope.btcprice = response.data.bpi.USD;
        });
    };
    $scope.init();
}]); //end BTC controller
