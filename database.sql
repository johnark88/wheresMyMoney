-- users table
CREATE TABLE users  (
		id SERIAL PRIMARY KEY,
		user_ID VARCHAR(100)
	);

-- Loans table
CREATE TABLE loans  (
		loanid SERIAL PRIMARY KEY,
		user_id INT REFERENCES users (id),
		fromwho VARCHAR(20),
		amount NUMERIC,
		duration VARCHAR(20),
		intrestrate VARCHAR(10),
		monthlyPayment NUMERIC,
		notes VARCHAR(500)
	);

-- loans Archive Table
	CREATE TABLE loansArchive  (
		loanid SERIAL PRIMARY KEY,
		user_id INT REFERENCES users (id),
		fromwho VARCHAR(30),
		amount NUMERIC,
		duration VARCHAR(20),
		interestrate NUMERIC,
		monthlypayment NUMERIC ,
		notes VARCHAR(500)
	);

-- Loan payments table
CREATE TABLE loanPayments  (
 		loanid INT REFERENCES loans (loanid),
		user_id INT REFERENCES users (id),
		paymentDATE DATE,
		paymentAmount NUMERIC,
		notes VARCHAR(500)
	);

-- totals table
CREATE TABLE totals  (
		user_id INT REFERENCES users (id),
		totalInvested NUMERIC,
		totalPL NUMERIC,
		totalOwed NUMERIC,
		totalMonthlyOwed NUMERIC
			);

Investments Table
CREATE TABLE investments  (
  investmentID SERIAL PRIMARY KEY,
  user_id INT REFERENCES users (id),
  bank VARCHAR(30),
  stocksymbol VARCHAR(10),
  amountInvested NUMERIC,
  profitLoss NUMERIC,
  purchaseDate VARCHAR(11) ,
  soldDate VARCHAR(11)
);

-- Archived investments
CREATE TABLE investmentsArchive  (
		investmentID SERIAL PRIMARY KEY,
		user_id INT REFERENCES users (id),
		bank VARCHAR(30),
		stocksymbol VARCHAR(10),
		amountInvested NUMERIC,
		profitLoss NUMERIC,
		purchaseDate VARCHAR(11) ,
		soldDate VARCHAR(11)
	);

-- transfer from investments to investmentsArchive
INSERT INTO investmentsArchive
SELECT investmentid, user_id, bank, stocksymbol, amountInvested, profitLoss, purchaseDate, soldDate
FROM investments
WHERE investmentID = 3;

-- after transfer delete from investments table
DELETE FROM investments
WHERE investmentID= 3;
