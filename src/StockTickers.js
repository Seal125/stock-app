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