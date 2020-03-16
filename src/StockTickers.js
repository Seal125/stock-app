/*
This page creates a shema with mongoose for creating instances of buying a share to be later used in data manipulation.
*/

const mongoose = require("mongoose");

const StockTicker = mongoose.Schema({
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
});

module.exports = mongoose.model("StockTicker", StockTicker);