const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const user = require('./routes/user');
const purchasing = require('./routes/buyingShares');
const transactions = require('./routes/userTransactions');
const InitMongoServer = require("./database/db");
const engine = require('ejs-locals');
const app = express();
const port = process.env.PORT || 4000;

InitMongoServer();

app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(bodyParser.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));


app.get("/", (req, res) => {
  res.render('register.ejs')
});

app.get('/signin', (req, res) => {
  res.render('signin.ejs')
})

app.get('/portfolio', (req, res) => {
  res.render('portfolio.ejs')
})

app.get('/transactions', (req, res) => {
  res.render('transactions.ejs')
})

app.use("/user", user);
app.use('/shares', purchasing);
app.use('/transactions', transactions)

app.listen(port, (req, res) => {
  console.log(`Listening at port ${port}`);
});