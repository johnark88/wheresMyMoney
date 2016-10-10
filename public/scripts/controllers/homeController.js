myApp.controller('homeController', ['$scope','$http', 'apiFactory',function($scope, $http, apiFactory){
  console.log('homeController');


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


};//end init scope for news and stock quotes
console.log(apiFactory,'FACTORY DATA');
  $scope.init();
}]);//end controller


//********* get other news sources and populate a select drop down, so they can choose the source and pull up the photos
