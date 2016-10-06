var router = require('express').Router();
var path = require('path');
var connectionString = 'postgress://localhost:5432/wmm';
var pg = require('pg');

router.post('/newInv', function(req,res){
console.log('post new route');
console.log('object recived ', req.body);

//listing out req dot body objects for db INSERT 
  var bank = req.body.bank;
  var amountInvested = req.body.amountinvested;
  var stockSymbol = req.body.stockSymbol;
  var profitLoss = req.body.pl;
  var purchaseDate = req.body.date;
  //console log each to double check
    console.log(bank, amountInvested, stockSymbol, profitLoss,purchaseDate);

//connection to the data base
pg.connect(connectionString, function(err,client,done){
  if (err) {
    console.log(err);
  }else {
    console.log('Connected to DB');
    client.query('INSERT INTO investments (bank,stocksymbol,amountinvested,profitloss,purchasedate) VALUES($1, $2, $3, $4, $5)', [bank , stockSymbol , amountInvested , profitLoss , purchaseDate]);
    res.send({success: true});
  }//end else
});//end pg connect
});//end router post new investment




module.exports = router;
