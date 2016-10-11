var router = require('express').Router();
var path = require('path');
var connectionString = 'postgress://localhost:5432/wmm';
var pg = require('pg');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(bodyParser.json());


router.post('/deleteInv',urlencodedParser,function(req,res){
console.log('req dot body check  ',  req.body);

var newAmtInv = req.body.amountinvested;
var profitLoss = req.body.profitLoss;
var dateSold = req.body.dateSold;
var investmentid = req.body.invId;

    //breaks of the time stamp leaving only the date
    var newDate = dateSold.split("T").shift();
    console.log(newDate,'split pop that string');

  pg.connect(connectionString, function(err,client,done){
    if (err) {
      console.log(err);
    }else {
      console.log('Connected to DB / del route');
      client.query('UPDATE investments SET amountinvested = ($1), profitloss = ($2), solddate = ($3) WHERE investmentid = ($4)', [newAmtInv , profitLoss , newDate, investmentid]);
      client.query('INSERT INTO investmentsArchive SELECT investmentid, user_id, bank, stocksymbol, amountInvested, profitLoss, purchaseDate, soldDate FROM investments	WHERE investmentID = ($1)',[investmentid]);
      client.query('DELETE FROM investments WHERE investmentID = ($1)', [investmentid]);
      res.send({success: true});
    }//end else
  });//end pg connect
  });//end router dot put


module.exports = router;
