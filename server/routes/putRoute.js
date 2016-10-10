var router = require('express').Router();
var path = require('path');
var connectionString = 'postgress://localhost:5432/wmm';
var pg = require('pg');

//put route to investment table
router.put('/updateInv', function(req,res){
  console.log('in router put ');
    //breaking up req dot body to use for db UPDATE
  var newAmtInv = req.body.amountinvested;
  var profitLoss = req.body.profitLoss;
  var dateSold =req.body.dateSold;
  var investmentid = req.body.invId;

  //breaks of the time stamp leaving only the date
  var newDate = dateSold.split("T").shift();
  console.log(newDate,'split pop that string');

//connection to the data base
pg.connect(connectionString, function(err,client,done){
  if (err) {
    console.log(err);
  }else {
    console.log('Connected to DB');
    //Send update investments with edits made to DB
    client.query('UPDATE investments SET amountinvested = $1, profitloss = $2, solddate = $3 WHERE investmentid = $4', [newAmtInv , profitLoss , newDate, investmentid]);
    res.send({success: true});
  }//end else
});//end pg connect
});//end router dot put





//put route to loans table
router.put('/updateLoan', function(req,res){
  console.log('router dot put loan');




});//end router dot put loan changes

module.exports = router;
