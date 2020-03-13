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

module.exports = mongoose.model("transactions", Transactions);