var lock = new Auth0Lock( 'vMz8kOdOn1pbp739hs7OTRytCZX11bv3', 'johnmilton.auth0.com');

myApp.controller('logInController', ['$scope','$http', function($scope, $http){
  console.log('NG');

  $scope.init = function(){
    console.log('init');
    if( JSON.parse(localStorage.getItem('userProfile'))){
      $scope.userProfile = JSON.parse(localStorage.getItem('userProfile'));
      console.log('logged In as:', $scope.userProfile);
    }else{
      emptyLocalStorage();
    }//end else
  }; // end init function

$scope.logIn = function(){
  console.log('logging In');
  lock.show(function(err, profile, token){
    if (err) {
      console.log('authentication err ', err);
    }else {
      localStorage.setItem('userToken', token);
      localStorage.setItem( 'userProfile', JSON.stringify(profile));
      location.reload();
    }
  });//end lock.show
};//end scope.login function
$scope.logOut
$scope.init();
}]);//end homeController

var emptyLocalStorage = function(){
  localStorage.removeItem( 'userProfile' );
  localStorage.removeItem( 'userToken' );
}; // end emptyLocalStorage
