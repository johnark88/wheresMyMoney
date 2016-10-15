myApp.factory('invFactory', function($http){
  console.log('in factory ');

  return { allInvestments: function(callback){
      $http({
        method: 'GET',
        url: '/investments'
      }).success(callback);
    }//end function callback
  };//end return object
}); //end myApp factory
