var router = require('express').Router();
var path = require('path');
var connectionString = 'postgress://localhost:5432/wmm';
var pg = require('pg');

router.delete('/', function(req,res){

  pg.connect(connectionString, function(err,client,done){
    if (err) {
      console.log(err);
    }else {
      console.log('Connected to DB');
      client.query('');
      res.send({success: true});
    }//end else
  });//end pg connect
  });//end router dot put


module.exports = router;