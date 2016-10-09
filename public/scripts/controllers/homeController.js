myApp.controller('homeController', ['$scope','$http', function($scope, $http){
  console.log('homeController');

  //Yahoo Finance API
  var yahoo = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D'http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes.csv%3Fs%3DYHOO%2CGOOG%2CAAPL%2CMSFT%26f%3Dsl1d1t1c1ohgv%26e%3D.csv'%20and%20columns%3D'symbol%2Cprice%2Cdate%2Ctime%2Cchange%2Ccol1%2Chigh%2Clow%2Ccol2'&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
  var stockQuotes;

  //newsapi.org top news from Wall Street Journal
  var newsAPI = 'https://newsapi.org/v1/articles?source=the-wall-street-journal&sortBy=top&apiKey=c28f8197835d4d338e3bd3b0456e68cd';
  var newsArticles = [];


  $scope.init =function(){
  $http({
    method:'GET',
    url: newsAPI,
  }).then(function(response){
    console.log(response.data.articles);
      $scope.newsArticles = response.data.articles;
    });

  //get stock quotes from yahoo
  $http({
    method: 'GET',
    url: yahoo,
  }).then(function(response){
    console.log(response.data.query.results.row);
    $scope.stockQuotes = response.data.query.results.row;
  });//end http get for yahoo
};//end init scope for news and stock quotes
  $scope.init();
}]);//end controller
