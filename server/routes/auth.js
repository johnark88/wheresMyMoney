var router = require('express').Router();
var path = require('path');
var firebase = require('firebase');
var pg = require('pg');
var connectionString = 'postgress://localhost:5432/wmm';

firebase.initializeApp({
    serviceAccount: "./server/firebase-service-account.json",
    databaseURL: "https://firenode-155ef.firebaseio.com/"
});


// This is the route for your secretData
router.get("/status", function(req, res) {
        firebase.auth().verifyIdToken(req.headers.id_token).then(function(decodedToken) {
            console.log(decodedToken);
            var clientUID = decodedToken.user_id;
            pg.connect(connectionString, function(err, client, done) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('connected to db');
                    var resultsArray = [];
                    //check if email in decodedToken has admin privliges
                    var queryResults = client.query('SELECT id FROM users WHERE user_id = $1', [clientUID]);
                    queryResults.on('row', function(row) {
                        //push query to resultsArray
                        resultsArray.push(row);
                        console.log(resultsArray, 'Results');
                    }); //end query results on row
                    queryResults.on('end', function() {
                        done();
                        //send isAdmin from database to client
                        return res.send(resultsArray);
                    }); //end queryResults on end
                } //end else
            }); //end pg connect
        }) //end firebase auth

    .catch(function(error) {
        // If the id_token isn't right, you end up in this callback function
        res.send("No secret data for you!");
    }); //end catch
  }); //end firebase auth
module.exports = router;
