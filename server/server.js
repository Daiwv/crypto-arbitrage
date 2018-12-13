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
    price: coin.sell}
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
    price: coin.Ask}
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
    axios.get("https://api.binance.com/api/v3/ticker/bookTicker")
  .then(function (response) {
    let removeUSDT = response.data.filter(coin => !coin.symbol.includes("USDT"))
    let removeBNB = removeUSDT.filter(coin => !coin.symbol.includes("BNB"))
    let removeETH = removeBNB.filter(coin => !coin.symbol.includes("ETH"))
    let binanceSymbols = removeETH.map((coin) => (
      {symbol: "BTC-" + coin.symbol.replace("BTC", ""),
      price: coin.askPrice}
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

app.get('/kucoin', (req, res) => {
  axios.get("https://api.kucoin.com/v1/open/tick")
.then(function (response) {
  // res.send(response.data.data)
  // response.data.data.map((coin) => {
  //   console.log(coin)
  // })
  let removeUSDT = response.data.data.filter(coin => !coin.coinTypePair.includes("USDT"))
  let removeUSD = removeUSDT.filter(coin => !coin.coinTypePair.includes("USD"))
  let removeETH = removeUSD.filter(coin => !coin.coinTypePair.includes("ETH"))
  let kucoinSymbols = removeETH.map((coin) => (
    {symbol: "BTC-" + coin.symbol.replace("-BTC", ""),
    price: coin.sell}
  ))
  res.send(kucoinSymbols)
  console.log('API request for Kucoin data complete.')
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



