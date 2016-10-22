var router = require('express').Router();
var path = require('path');
var firebase = require('firebase');
var pg = require('pg');
var connectionString = 'postgress://localhost:5432/cimarron';

firebase.initializeApp({
    serviceAccount: "./server/firebase-service-account.json",
    databaseURL: "https://firenode-155ef.firebaseio.com/"
});


// This is the route for your secretData
router.get("/secretData", function(req, res) {
    firebase.auth().verifyIdToken(req.headers.id_token).then(function(decodedToken) {
            
            console.log(decodedToken); // Here you can see the information firebase gives you about the user
            res.send("Secret DATA!!! You got it!!! Great work " + decodedToken.name + "!!!");
        }) //end firebase auth
        .catch(function(error) {
            // If the id_token isn't right, you end up in this callback function
            res.send("No secret data for you!");
        }); //end catch

}); //end router dot get

module.exports = router;
