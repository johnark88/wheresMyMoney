myApp.controller('logInController', ['$scope', '$http', '$firebaseArray', '$firebaseAuth', function($scope, $http, $firebaseArray, $firebaseAuth) {
    console.log('NG');

    var auth = $firebaseAuth();

    $scope.logIn = function login() {
        auth.$signInWithPopup("google").then(function(firebaseUser) {
            console.log("Signed in as:", firebaseUser.user.displayName);
        }).catch(function(error) {
            console.log("Authentication failed: ", error);
        });
    };


    auth.$onAuthStateChanged(function(firebaseUser) {
        // firebaseUser will be null if not logged in
        if (firebaseUser) {
            // This is where we make our call to our server
            firebaseUser.getToken().then(function(idToken) {
                $http({
                    method: 'GET',
                    url: '/status',
                    headers: {
                        id_token: idToken
                    } //end http
                }).then(function(response) {
                    $scope.secretData = response.data;
                }); //end then
            }); //end firebaseUser get token
        } else {
            console.log('Not logged in.');
            $scope.secretData = "Log in to get some secret data.";
        } //end else
    }); //end auth state change

    // This code runs when the user logs out
    $scope.logOut = function() {
        auth.$signOut().then(function() {
          emptyLocalStorage();
            console.log('Logging the user out!');
        }); //end then
    }; //end log out
}]); //end homeController
