var router = require('express').Router();
var path = require('path');
var connectionString = 'postgress://localhost:5432/wmm';
var pg = require('pg');

//************ where id matches that of logged in user **********************
router.get('/investments', function(req,res){
  console.log('in app.get investments');
  pg.connect(connectionString, function(err,client,done){
    if (err) {
      console.log(err);
    }else {
      var resultsArray = [];
      var queryResults = client.query('SELECT * FROM investments');
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

















module.exports = router;
