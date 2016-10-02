var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var portDecision = process.env.PORT || 4040;

app.listen(portDecision, function(){
  console.log('Im listening on ', portDecision);
});
