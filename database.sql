



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
		amount MONEY,
		duration VARCHAR(20),
		intrestrate VARCHAR(10),
		monthlyPayment MONEY,
		notes VARCHAR(500)
	);

-- Loan payments table
CREATE TABLE loanPayments  (
 		loanid INT REFERENCES loans (loanid),
		user_id INT REFERENCES users (id),
		paymentDATE DATE,
		paymentAmount MONEY,
		notes VARCHAR(500)
	);

-- totals table
CREATE TABLE totals  (
		user_id INT REFERENCES users (id),
		totalInvested MONEY,
		totalPL MONEY,
		totalOwed MONEY,
		totalMonthlyOwed MONEY
			);

Investments Table
CREATE TABLE investments  (
  investmentID SERIAL PRIMARY KEY,
  user_id INT REFERENCES users (id),
  bank VARCHAR(30),
  stocksymbol VARCHAR(10),
  amountInvested MONEY,
  profitLoss MONEY,
  purchaseDate VARCHAR(11) ,
  soldDate VARCHAR(11)
);

-- Archived investments
CREATE TABLE investmentsArchive  (
		investmentID SERIAL PRIMARY KEY,
		user_id INT REFERENCES users (id),
		bank VARCHAR(30),
		stocksymbol VARCHAR(10),
		amountInvested MONEY,
		profitLoss MONEY,
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
