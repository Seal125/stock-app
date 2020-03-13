const express = require('express');
const auth = require('../auth/auth');
const router = express.Router();
const stockPrice = require('../api/api');
const auth = require('../auth/auth');
const User = require('../src/User');
const Transaction = require('../src/Transactions');
const StockTicker = require('../src/StockTickers');


router.post('/', auth, async (req, res) => {
  const ticker = req.body.ticker.toUpperCase();
  const share = req.body.shares;
  const total = (await getStocksPrice(ticker)) * share;
  try {
    const user = await User.findById(req.user.id);
    const userBalance = user.balance;


    const totalPrice = userBalance - total;

    if (totalPrice > 0) {
      user.balance = totalPrice;
      await user.save();
      res.status(200);
    } else if (totalPrice < 0) {
      res.json({
        message: "You don't have enough to purchase this share."
      });
    }
  } catch (err) {
    console.error(err);
    res.send({
      message: 'There was an error fetching the user.'
    });
  }

  Transaction.create({
    user_id: req.user.id,
    ticker: ticker,
    quantity: share,
    cost: total,
    date: Date.now(),
  });
  StockTicker.find({
      user_id: req.user.id,
      ticker: ticker,
    })
    .then(async (stock) => {
      if (stock.length !== 0) {
        const userTic = await StockTicker.findById(stock[0]._id);
        userTic.quantity += Number(shares);
        await userTic.save();
      } else {
        return StockTicker.create({
          user_id: req.user.id,
          ticker: ticker,
          quantity: share,
        });
      }
    })
    .catch((err) => console.error('There was an error with your transaction.', err));
});

module.exports = router;