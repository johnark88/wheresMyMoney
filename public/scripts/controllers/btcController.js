myApp.controller('btcController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
    console.log('btcController');



    $scope.init = function() {
        console.log('here');
          //get current price of btc
        $http({
            method: 'GET',
            url: 'http://api.coindesk.com/v1/bpi/currentprice.json'
        }).then(function(response) {
            console.log('BTC', response.data.bpi.USD);
            $scope.btcPrice = response.data.bpi.USD;
        });
        //get curent price of etherum 
        $http({
            method: 'GET',
            url: 'https://poloniex.com/public?command=returnTicker'
        }).then(function(response) {
            console.log(response.data.BTC_ETH);
            $scope.ethPrice = response.data.BTC_ETH;
        });
        $scope.getDatetime = function() {
            var timestamp = (new Date).toLocaleFormat("%A, %B %e, %Y");
            console.log(timestamp);
        };
    }; //end scope dot init
    $scope.init();
}]); //end BTC controller
