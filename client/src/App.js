import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CoinLayout from './Components/CoinLayout.js';
import axios from 'axios';

class App extends Component {
  
  state = {
    loaded: false,
		allResults: []
  }

  async getMarketData() {
    try {
      let marketData = []   
      let tempResults = []

      const allSymbolsResponse = {};

      //ADD MORE EXCHANGE PULLS HERE
			const binanceResponse = await axios.get('http://localhost:8080/binance');
			const binanceData = binanceResponse.data;

			binanceData.forEach((binance) => {
				if (allSymbolsResponse[binance.symbol]) {
					allSymbolsResponse[binance.symbol]['binance'] = binance.price;
				} else {
					allSymbolsResponse[binance.symbol] = {};
					allSymbolsResponse[binance.symbol]['binance'] = binance.price;
				}
			});

			const bittrexResponse = await axios.get('http://localhost:8080/bittrex');
			const bittrexData = bittrexResponse.data;

			bittrexData.forEach((bittrex) => {
				if (allSymbolsResponse[bittrex.symbol]) {
					allSymbolsResponse[bittrex.symbol]['bittrex'] = bittrex.price;
				} else {
					allSymbolsResponse[bittrex.symbol] = {};
					allSymbolsResponse[bittrex.symbol]['bittrex'] = bittrex.price;
				}
			});
      
      // const okexResponse = await axios.get('http://localhost:8080/okex');
			// const okexData = okexResponse.data;

			// okexData.forEach((okex) => {
			// 	if (allSymbolsResponse[okex.symbol]) {
			// 		allSymbolsResponse[okex.symbol]['okex'] = okex.price;
			// 	} else {
			// 		allSymbolsResponse[okex.symbol] = {};
			// 		allSymbolsResponse[okex.symbol]['okex'] = okex.price;
			// 	}
      // });
      
      const kucoinResponse = await axios.get('http://localhost:8080/kucoin');
			const kucoinData = kucoinResponse.data;

			kucoinData.forEach((kucoin) => {
				if (allSymbolsResponse[kucoin.symbol]) {
					allSymbolsResponse[kucoin.symbol]['kucoin'] = kucoin.price;
				} else {
					allSymbolsResponse[kucoin.symbol] = {};
					allSymbolsResponse[kucoin.symbol]['kucoin'] = kucoin.price;
				}
			});

      const symbolArr = Object.entries(allSymbolsResponse)
      for (let [symbol, exchange] of symbolArr) {
        let tempObj = {symbol: symbol, exchange: exchange}
        marketData.push(tempObj)
      }

      marketData.forEach((coin) => {
        let tempAvg = []
        tempAvg.push(coin.exchange.binance, coin.exchange.bittrex, coin.exchange.kucoin)
        //removed OKex from above , coin.exchange.okex
        let maxPrice = Math.max(...tempAvg)
        let minPrice = Math.min(...tempAvg)
        let maxAnswer
        let minAnswer
        let percentCalc = (maxPrice - minPrice) / minPrice * 100;
        //ADD EXCHANGES FOR MIN MAX ANSWERS
        if ( maxPrice === parseFloat(coin.exchange.binance)) {
          maxAnswer = `sell ${coin.symbol} on Binance for ${coin.exchange.binance}BTC for a profit of ${percentCalc.toFixed(2)}%.`
        } else if ( minPrice === parseFloat(coin.exchange.binance)) {
          minAnswer = `Buy ${coin.symbol} on Binance for ${coin.exchange.binance}BTC and `
        }

        if ( maxPrice === parseFloat(coin.exchange.bittrex)) {
          maxAnswer = `sell ${coin.symbol} on Bittrex for ${coin.exchange.bittrex}BTC for a profit of ${percentCalc.toFixed(2)}%.`
        } else if ( minPrice === parseFloat(coin.exchange.bittrex)) {
          minAnswer = `Buy ${coin.symbol} on Bittrex for ${coin.exchange.bittrex}BTC and `
        }

        // if ( maxPrice === parseFloat(coin.exchange.okex)) {
        //   maxAnswer = `sell ${coin.symbol} on OKex for ${coin.exchange.okex}BTC for a profit of ${percentCalc.toFixed(2)}%.`
        // } else if ( minPrice === parseFloat(coin.exchange.okex)) {
        //   minAnswer = `Buy ${coin.symbol} on OKex for ${coin.exchange.okex}BTC and `
        // }

        if ( maxPrice === parseFloat(coin.exchange.kucoin)) {
          maxAnswer = `sell ${coin.symbol} on Kucoin for ${coin.exchange.kucoin}BTC for a profit of ${percentCalc.toFixed(2)}%.`
        } else if ( minPrice === parseFloat(coin.exchange.kucoin)) {
          minAnswer = `Buy ${coin.symbol} on Kucoin for ${coin.exchange.kucoin}BTC and `
        }

        if (!minAnswer) {   
        } else {
          const fullAnswer = `${minAnswer}${maxAnswer}`
          tempResults.push(fullAnswer)
        }
        // console.log(maxPrice, parseFloat(coin.exchange.binance))
        // console.log(maxPrice, minPrice, coin.exchange.binance)
        // console.log(`${coin.symbol}: Buy at ${minPrice}BTC, sell at ${maxPrice}BTC.`)
        // console.log(`${coin.symbol} sells for ${coin.exchange.binance}BTC, ${coin.exchange.bittrex}BTC and ${coin.exchange.okex}BTC. `)
      })

      this.setState({
        loaded: true,
        allResults: tempResults,
      }) 
    } catch (error) {
      console.error(error)
    }
  }

  componentWillMount() {
    this.getMarketData()
  }

  render() {
      return this.state.loaded === true ? (
        <React.Fragment>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Cryptocurrency Arbitrage</h1>
            </header>
          </div>
        <CoinLayout allResults={this.state.allResults} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Cryptocurrency Arbitrage</h1>
            </header>            
          </div>
          <div className="Loading">
            <img src="../loader.gif" alt='loading'/>
            <p>Loading Coins...</p>
          </div>
        </React.Fragment>
      )
  }
}

export default App;