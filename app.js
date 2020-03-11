const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const User = require("./src/User");
const app = express();
const port = 3001;

app.set('view engine', 'ejs');
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(expressLayouts);

app.get('/', (req, res) => {
  res.render('register.ejs')
});

app.get('/signin', (req, res) => {
  res.render('signin.ejs')
})

const user = new User();

app.post('/portfolio', (req, res) => {
  console.log(req.body)
  user.name = req.body.name
  user.email = req.body.email
  user.password = req.body.password
  user.isRegistered()
  res.render('portfolio.ejs', {
    user
  })
})

app.get('/transactions', (req, res) => {
  console.log(req.body)

  res.render('transactions.ejs')
})

app.listen(port, () => console.log(`Listening on port ${port}.`));