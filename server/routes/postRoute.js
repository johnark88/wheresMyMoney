var router = require('express').Router();
var path = require('path');
var connectionString = 'postgress://localhost:5432/wmm';
var pg = require('pg');

//save new investment
router.post('/newInv', function(req, res) {
    console.log('post new route');

    //listing out req dot body objects for db INSERT
    var bank = req.body.bank;
    var amountInvested = req.body.amountinvested;
    var stockSymbol = req.body.stockSymbol;
    var profitLoss = req.body.pl;
    var purchaseDate = req.body.date;

    //console log each to double check
    console.log(bank, amountInvested, stockSymbol, profitLoss, purchaseDate);

    //breaks off the time stamp leaving only the date
    var newDate = purchaseDate.split("T").shift();

    //connection to the data base
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to DB');
            //insert new investment to the DB
            client.query('INSERT INTO investments (bank,stocksymbol,amountinvested,profitloss,purchasedate) VALUES($1, $2, $3, $4, $5)', [bank, stockSymbol, amountInvested, profitLoss, newDate]);
            res.send({
                success: true
            });
        } //end else
    }); //end pg connect
}); //end router post new investment


//save new loan
router.post('/saveNewLoan', function(req, res) {
    console.log('post new Loan route');

    //listing out req dot body objects for db INSERT
    var fromWho = req.body.fromwho;
    var amount = req.body.amount;
    var duration = req.body.duration;
    var interestrate = req.body.interestrate;
    var monthlyPay = req.body.monthlyPay;
    var notes = req.body.notes;


    //connection to the data base
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to DB');
            //insert new investment to the DB
            client.query('INSERT INTO loans (fromwho,amount,duration,interestRate,monthlypayment, notes) VALUES($1, $2, $3, $4, $5, $6)', [fromWho, amount, duration, interestrate, monthlyPay, notes]);
            res.send({
                success: true
            });
        } //end else
    }); //end pg connect
}); //end router post new investment


//save payment on loan
router.post('/savePayment', function(req, res) {
    console.log('save payment on loan route');
    console.log(req.body);

    var date = req.body.date;
    var amount = req.body.amount;
    var id = req.body.loanid;

    //breaks off the time stamp leaving only the date
    var newDate = date.split("T").shift();

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log(err);
        } else {
            console.log('db connected true');
            //save new payment to db
            client.query('INSERT INTO loanpayments (loanid,paymentdate,paymentamount) VALUES ($1, $2, $3)', [id, newDate, amount]);
            res.send({
                success: true
            });
        }
    });
});

module.exports = router;