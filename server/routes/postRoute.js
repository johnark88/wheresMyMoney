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

    //breaks of the time stamp leaving only the date
    var newDate = purchaseDate.split("T").shift();
    console.log(newDate,'split pop that string');

//connection to the data base
pg.connect(connectionString, function(err,client,done){
  if (err) {
    console.log(err);
  }else {
    console.log('Connected to DB');
    //insert new investment to the DB
    client.query('INSERT INTO investments (bank,stocksymbol,amountinvested,profitloss,purchasedate) VALUES($1, $2, $3, $4, $5)', [bank , stockSymbol , amountInvested , profitLoss , newDate]);
    res.send({success: true});
  }//end else
});//end pg connect
});//end router post new investment



router.post('/saveNewLoan', function(req,res){
console.log('post new Loan route');
console.log('object recived ', req.body);

//listing out req dot body objects for db INSERT
var fromWho = req.body.fromwho;
var amount = req.body.amount;
var duration = req.body.duration;
var interestrate = req.body.interestrate;
var monthlyPay = req.body.monthlyPay;
var notes = req.body.notes;
//need user_id here ************************************

  //console log each to double check
    console.log(fromWho,amount,duration,interestrate,monthlyPay,notes);

//connection to the data base
pg.connect(connectionString, function(err,client,done){
  if (err) {
    console.log(err);
  }else {
    console.log('Connected to DB');
    //insert new investment to the DB
    client.query('INSERT INTO loans (fromwho,amount,duration,interestRate,monthlypayment, notes) VALUES($1, $2, $3, $4, $5, $6)', [fromWho , amount , duration , interestrate , monthlyPay, notes]);
    res.send({success: true});
  }//end else
});//end pg connect
});//end router post new investment




module.exports = router;
