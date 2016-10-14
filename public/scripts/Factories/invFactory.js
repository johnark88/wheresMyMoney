myApp.factory('invFactory', function($http){
  console.log('in factory ');

  var allInvestments = function(){

      $http({
        method: 'GET',
        url: '/investments'
      }).then(function(response){
        console.log(response.data,'datatatatatatatatatatat');
        allInvestments = response.data;
        console.log(allInvestments, 'kajsdajsdkjhaksjdhakjshdkajshdkajhsda');
      });//end then

      return {
        getArray: allInvestments
      };
  };

  return allInvestments();
}); //end myApp factory
