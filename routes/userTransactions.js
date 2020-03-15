const express = require('express');
const router = express.Router()
const auth = require('../auth/auth');
const Transaction = require('../src/Transactions');
const StockTicker = require('../src/StockTicker')

router.get('/', (req, res) => {
  res.render('transactions')
})

router.post('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user_id: req.user.id
    });
    res.send(transactions)
  } catch (err) {
    console.error('There was an error fetching user transactions.', err)
  }
});

router.post('/stock', auth, async (req, res) => {
  try {
    const stocks = await StockTicker.find({
      user_id: req.user.id
    })
    res.send(stocks)
  } catch (err) {
    console.error('There was an error fetching data.', err)
  }
})

module.exports = router;