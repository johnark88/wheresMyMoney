var lock = new Auth0Lock( 'vMz8kOdOn1pbp739hs7OTRytCZX11bv3', 'johnmilton.auth0.com');
var logOutUrl = 'https://johnmilton.auth0.com/v2/logout?';

myApp.controller('logInController', ['$scope','$http', function($scope, $http){
  console.log('NG');

  $scope.init = function(){
    console.log('init');
    if( JSON.parse(localStorage.getItem('userProfile'))){
      $scope.userProfile = JSON.parse(localStorage.getItem('userProfile'));
      console.log('logged In as:', $scope.userProfile);
      console.log('userid', $scope.userProfile.user_id);
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
    }//end else
  });//end lock.show
};//end scope.login function
$scope.logOut = function(){
  $http({
    method: 'GET',
    url: logOutUrl
  }).then(function(response){
    console.log( 'http response:', response );
    // if(response.data == 'OK')
    // emptyLocalStorage();
  });
};//end log out
$scope.init();
}]);//end homeController

var emptyLocalStorage = function(){
  localStorage.removeItem( 'userProfile' );
  localStorage.removeItem( 'userToken' );
}; // end emptyLocalStorage
