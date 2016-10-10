myApp.factory('apiFactory', [ '$http', '$timeout',function($http, $timeout){

  var loadTime = 600000,errorCount = 0, loadPromise;

  //Yahoo Finance API
  var yahoo = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D'http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes.csv%3Fs%3DYHOO%2CGOOG%2CAAPL%2CMSFT%26f%3Dsl1d1t1c1ohgv%26e%3D.csv'%20and%20columns%3D'symbol%2Cprice%2Cdate%2Ctime%2Cchange%2Ccol1%2Chigh%2Clow%2Ccol2'&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
  var stockQuotes;


  //get stock quotes from yahoo
  var getData = function (){
  $http({
    method: 'GET',
    url: yahoo,
    cache: true
  }).then(function(response){
    console.log(response.data.query.results.row);
    stockQuotes = response.data.query.results.row;
    errorCount = 0;
    nextLoad();

  }).catch(function(response){
    stockQuotes = 'Server Error';
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

  getData();


  return {
    data : stockQuotes
  };

}]);//end factory
