/*
This page creates a shema for transactions, where this information will be displayed in the transactions page.
*/

const mongoose = require("mongoose");

const Transactions = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  ticker: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Transactions", Transactions);