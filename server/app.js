var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var pg = require('pg');
var portDecision = process.env.PORT || 4040;
// var connectionString = 'postgress://localhost:5432/dbName';

app.use(bodyParser.json());

//index route
var index = require('./routes/index');


//choose port send respons
app.listen(portDecision, function(){
  console.log('Im listening on ', portDecision);
});
//use public folder
app.use(express.static('public'));
