myApp.controller('homeController', ['$scope','$http', '$timeout',function($scope, $http, $timeout){
  console.log('homeController');

  //newsapi.org top news from Wall Street Journal
  var newsAPI = 'https://newsapi.org/v1/articles?source=the-wall-street-journal&sortBy=top&apiKey=c28f8197835d4d338e3bd3b0456e68cd';
  var newsArticles = [];

  //Finance API's
  var yahoo = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22YHOO%20MSFT%20KO%20JNJ%20GOOG%20AAPL%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
  var stockQuotes;

  $scope.init =function(){
    $http({
      method:'GET',
        url: newsAPI,
      }).then(function(response){
        console.log(response.data.articles);
        $scope.newsArticles = response.data.articles;
      });
    };//end init scope for news and stock quotes
      $scope.init();


  //data load time / hit api every.... //0.5min - 30000 //1 min - 60000 //5min - 300000 //10min - 600000
  var loadTime = 600000,
  //count the errors from API
  errorCount = 0,
  //promise pointer
  loadPromise;
  //get stock quotes from yahoo
  var getData = function (){
    $http({
      method: 'GET',
        url: yahoo
          }).then(function(response){
            console.log(response);
              $scope.stockQuotes = response.data.query.results.quote;
                // $scope.stockQuotes
                console.log($scope.stockQuotes, 'AFTER THE SWITCH @@@@@@');
                  errorCount = 0;
                    nextLoad();
                  }).catch(function(response){
                      $scope.stockQuotes = 'Server Error';
                        nextLoad(++errorCount * 2 * loadTime);
                      });
                    };
        var cancelNextLoad = function(){
          $timeout.cancel(loadPromise);
          };
    var nextLoad = function(mill){
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


    $scope.stockQuotes = 'Loading...';
}]);//end controller
