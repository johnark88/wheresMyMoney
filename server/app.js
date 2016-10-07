var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var pg = require('pg');
var portDecision = process.env.PORT || 4040;
var connectionString = 'postgress://localhost:5432/wmm';

app.use(bodyParser.json());

//choose port send respons
app.listen(portDecision, function(){
  console.log('Im listening on ', portDecision);
});

//index route
var index = require('./routes/index');

//post route
var postRoute = require('./routes/postRoute');
app.use('/', postRoute);

//put Route
var putRoute = require('./routes/putRoute');
app.use('/', putRoute);

var delRoute =require('./routes/delRoute');
app.use('/', delRoute);



//************ where id matches that of logged in user **********************
app.get('/investments', urlencodedParser, function(req,res){
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




//use public folder
app.use(express.static('public'));
