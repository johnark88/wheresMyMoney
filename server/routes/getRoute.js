var router = require('express').Router();
var path = require('path');
var connectionString = 'postgress://localhost:5432/wmm';
var pg = require('pg');

//************ where id matches that of logged in user **********************
router.get('/investments', function(req,res){
  console.log('in router.get investments');
  pg.connect(connectionString, function(err,client,done){
    if (err) {
      console.log(err);
    }else {
      var resultsArray = [];
      //get all investments from DB
      var queryResults = client.query('SELECT * FROM investments');
      
      //push all results to array , send array to client
    queryResults.on('row', function(row){
        resultsArray.push(row);
        console.log(resultsArray);
      });//end query.on row

    queryResults.on('end', function(){
        done();
          return res.json(resultsArray);
       });//end queryResults.on end
    }//end if err else
  });//end pg connect
});//end app.get investments


router.get('/loans', function(req,res){
  console.log('in router.get loans');
  pg.connect(connectionString, function(err,client,done){
    if (err) {
      console.log(err);
    }else {
      var resultsArray = [];
      //get all loans from DB
      var queryResults = client.query('SELECT * FROM loans');

      //push all results to array , send array to client
    queryResults.on('row', function(row){
        resultsArray.push(row);
        console.log(resultsArray);
      });//end query.on row

    queryResults.on('end', function(){
        done();
          return res.json(resultsArray);
       });//end queryResults.on end
    }//end if err else
  });//end pg connect
});//end app.get loans


router.get('/loanpayments', function(req,res){
  console.log('in router.get loan payments');
  pg.connect(connectionString, function(err,client,done){
    if (err) {
      console.log(err);
    }else {
        var resultsArray = [];
          //get all loans from DB
          var queryResults = client.query('SELECT * FROM loanpayments');

    //push all results to array , send array to client
    queryResults.on('row', function(row){
        resultsArray.push(row);
        console.log(resultsArray);
      });//end query.on row

    queryResults.on('end', function(){
        done();
          return res.json(resultsArray);
       });//end queryResults.on end
    }//end if err else
  });//end pg connect
});//end router get loan payments

module.exports = router;
