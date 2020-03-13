const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const user = require("./routes/user");
const InitMongoServer = require("./database/db");
const engine = require('ejs-locals');

InitMongoServer();

const app = express();

app.use(expressLayouts);
app.engine('ejs', engine);
app.set('view engine', 'ejs');

const port = process.env.PORT || 4000;

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

app.post('/portfolio', (req, res) => {
  console.log(req.body)
  user.name = req.body.name
  res.render('portfolio.ejs')
})

app.get('/transactions', (req, res) => {
  res.render('transactions.ejs')
})

app.use("/", user);

app.listen(port, (req, res) => {
  console.log(`Listening at port ${port}`);
});