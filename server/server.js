const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/okex', (req, res) => {
  axios.get("https://www.okex.com/v2/spot/markets/index-tickers?limit=100000000")
.then(function (response) {
  let okexSymbols = response.data.data.map((coin) => (
    {symbol: "BTC-" + coin.symbol.toUpperCase().replace("_BTC", ""),
    price: coin.last}
  ))
  res.send(okexSymbols)
  console.log('API request for OKEx data complete.')
})
.catch(function (error) {
  // handle error
  console.log("Bork Bork something failed:", error);
})
.then(function () {
  // always executed
});
})


app.get('/bittrex', (req, res) => {
  axios.get("https://bittrex.com/api/v1.1/public/getmarketsummaries")
.then(function (response) {
  let bittrexSymbols = response.data.result.map((coin) => (
    {symbol: coin.MarketName,
    price: coin.Last}
  ))
  res.send(bittrexSymbols)
  console.log('API request for Bittrex data complete.')
})
.catch(function (error) {
  // handle error
  console.log("Bork Bork something failed:", error);
})
.then(function () {
  // always executed
});
})

app.get('/binance', (req, res) => {
    axios.get("https://api.binance.com/api/v1/ticker/price?")
  .then(function (response) {
    let removeUSDT = response.data.filter(coin => !coin.symbol.includes("USDT"))
    let removeBNB = removeUSDT.filter(coin => !coin.symbol.includes("BNB"))
    let removeETH = removeBNB.filter(coin => !coin.symbol.includes("ETH"))
    let binanceSymbols = removeETH.map((coin) => (
      {symbol: "BTC-" + coin.symbol.replace("BTC", ""),
      price: coin.price}
    ))
    res.send(binanceSymbols)
    console.log('API request for Binance data complete.')
  })
  .catch(function (error) {
    // handle error
    console.log("Bork Bork something failed:", error);
  })
  .then(function () {
    // always executed
  });
})

app.listen(8080, () => {
    console.log('Listening on port 8080.')
})



