/*
This page fetches the API data (which is free and has an unlimited amount of requests when you use their testing base URL) and returns it
as JSON.
*/

const fetch = require('node-fetch')

async function getStocksPrice(ticker) {
  try {
    const response = await fetch(`https://sandbox.iexapis.com/stable/stock/${ticker}/price?token=Tpk_18b14453d61745afbd4ff1def2a3b51d`)
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

module.exports = getStocksPrice;