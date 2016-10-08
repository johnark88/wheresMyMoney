var router = require('express').Router();
var path = require('path');
var connectionString = 'postgress://localhost:5432/wmm';
var pg = require('pg');

router.delete('/deleteInv',function(req,res){

var newAmtInv = req.body.amountinvested;
var profitLoss = req.body.profitLoss;
var dateSold = req.body.dateSold;
var investmentid = req.body.invId;

console.log('serverSide ', newAmtInv, profitLoss, dateSold, investmentid);

  pg.connect(connectionString, function(err,client,done){
    if (err) {
      console.log(err);
    }else {
      console.log('Connected to DB / del route');
      // client.query('UPDATE investments SET amountinvested = ($1), profitloss = ($2), solddate = ($3) WHERE investmentid = ($4)', [newAmtInv , profitLoss , dateSold, investmentid]);
      // client.query('INSERT INTO investmentsArchive SELECT investmentid, user_id, bank, stocksymbol, amountInvested, profitLoss, purchaseDate, soldDate FROM investments	WHERE investmentID = ($1)',[investmentid]);
      client.query('DELETE FROM investments WHERE investmentID = ($1)', [investmentid]);
      res.send({success: true});

    }//end else
  });//end pg connect
  });//end router dot put


module.exports = router;
