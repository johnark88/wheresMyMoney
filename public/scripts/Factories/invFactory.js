myApp.factory('invFactory','$http' , function($http){
  console.log('in factory ');


var allInvestments = [];



  $http({
    method: 'GET',
    url: '/investments'
      }).then(function(response){
        $scope.allInvestments = response.data;
});//end then



return allInvestments;



}); //end myApp factory
