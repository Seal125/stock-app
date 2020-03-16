/*
This page creates a shema for the user, where their information is stored to be later put into the database. This also tracks their balance.
*/

const mongoose = require("mongoose");

const User = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  balance: {
    type: Number,
    default: 5000
  }
});

module.exports = mongoose.model("User", User);