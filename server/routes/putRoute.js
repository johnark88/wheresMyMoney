var router = require('express').Router();
var path = require('path');
var connectionString = 'postgress://localhost:5432/wmm';
var pg = require('pg');

router.put('/updateInv', function(req,res){
  console.log('in router put ');

  var newAmtInv = req.body.amountinvested;
  var profitLoss = req.body.profitLoss;
  var dateSold =req.body.dateSold;
  var investmentid = req.body.invId;
  console.log(investmentid, newAmtInv, profitLoss,dateSold);
//connection to the data base
pg.connect(connectionString, function(err,client,done){
  if (err) {
    console.log(err);
  }else {
    console.log('Connected to DB');
    client.query('UPDATE investments SET amountinvested = $1, profitloss = $2, solddate = $3 WHERE investmentid = $4', [newAmtInv , profitLoss , dateSold, investmentid]);
    res.send({success: true});
  }//end else
});//end pg connect
});//end router dot put



module.exports = router;
