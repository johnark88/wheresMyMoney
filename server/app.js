var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
var pg = require('pg');
var portDecision = process.env.PORT || 4040;
var connectionString = 'postgress://localhost:5432/wmm';

app.use(bodyParser.json());

//choose port send respons
app.listen(portDecision, function() {
    console.log('Im listening on ', portDecision);
});
var auth = require('./routes/auth');
app.use('/', auth);
//Delete Route
var delRoute = require('./routes/delRoute');
app.use('/', delRoute);

//index route
var index = require('./routes/index');

//get Route
var getRoute = require('./routes/getRoute');
app.use('/', getRoute);

//post route
var postRoute = require('./routes/postRoute');
app.use('/', postRoute);

//put Route
var putRoute = require('./routes/putRoute');
app.use('/', putRoute);

//use public folder
app.use(express.static('public'));