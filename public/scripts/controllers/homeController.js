myApp.controller('homeController', ['invFactory', 'loanFactory', '$scope', '$http', '$timeout', function(invFactory, loanFactory, $scope, $http, $timeout) {
    console.log('homeController');

    var allInvHome = [];

    //newsapi.org
    var sourcesAPI = 'https://newsapi.org/v1/sources?language=en';
    var newsArticles = [];

    //Finance API's
    var yahoo = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22YHOO%20MSFT%20KO%20JNJ%20WFC%20COP%20WM%20ADP%20GM%20STX%20GLD%20PG%20T%20GD%20XOM%20GOOG%20AAPL%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
    var stockQuotes;

    $scope.init = function() {
        $http({
            method: 'GET',
            url: sourcesAPI
        }).then(function(response) {
            console.log(response.data.sources);
            $scope.allSources = response.data.sources;

        }); //end then http
    }; //end init scope for news and stock quotes

    $scope.init();

    //get selected source from drop down and get articles from that
    $scope.source = function() {
        console.log($scope.selectedSource.id);
        $http({
            method: 'GET',
            url: "https://newsapi.org/v1/articles?source=" + $scope.selectedSource.id + "&sortBy=top&apiKey=c28f8197835d4d338e3bd3b0456e68cd"
        }).then(function(response) {
            console.log(response.data.articles);
            $scope.newsArticles = response.data.articles;
        }); //end then
    }; //end selectedSource selection......


    //data load time / hit api every.... //0.5min - 30000 //1 min - 60000 //5min - 300000 //10min - 600000
    var loadTime = 600000,
        //count the errors from API
        errorCount = 0,
        //promise pointer
        loadPromise;
    //get stock quotes from yahoo
    var getData = function() {
        $http({
            method: 'GET',
            url: yahoo
        }).then(function(response) {
            // console.log(response);
            $scope.stockQuotes = response.data.query.results.quote;
            errorCount = 0;
            nextLoad();
        }).catch(function(response) {
            $scope.stockQuotes = 'Server Error';
            nextLoad(++errorCount * 2 * loadTime);
        }); //end catch
    }; //end getData function

    var cancelNextLoad = function() {
        $timeout.cancel(loadPromise);
    };

    var nextLoad = function(mill) {
        mill = mill || loadTime;
        cancelNextLoad();
        $timeout(getData, mill);
    };

    //start getting gata
    getData();
    //clears the timeout, no mem leak
    $scope.$on('$destroy', function() {
        cancelNextLoad();
    });

    //get all investments from factory
    invFactory.allInvestments(function(invFactory) {
        $scope.allInvHome = invFactory;
        console.log($scope.allInvHome, 'this is $scope.allInvHome inside homeController?');

        //loopp through Array and sum values in amountinvested and profitLoss
        // add scope to display
        $scope.totalInvested = 0;
        $scope.totalProfitLoss = 0;
        for (var i = 0; i < $scope.allInvHome.length; i++) {
            $scope.totalInvested += Number($scope.allInvHome[i].amountinvested);
            $scope.totalProfitLoss += Number($scope.allInvHome[i].profitloss);
        } //end for looop
    }); //end invFactory

    //get all loans from factory and sum values to display on home page
    loanFactory.allLoans(function(loanFactory) {
        $scope.allLoansHome = loanFactory;
        console.log($scope.allLoansHome, 'This is all loans for homepage');

        $scope.totalOwe = 0;
        $scope.totalMonthly = 0;
        for (var i = 0; i < $scope.allLoansHome.length; i++) {
            $scope.totalOwe += Number($scope.allLoansHome[i].amount);
            $scope.totalMonthly += Number($scope.allLoansHome[i].monthlypayment);
        }
    }); //end loan factory
}]); //end controller
