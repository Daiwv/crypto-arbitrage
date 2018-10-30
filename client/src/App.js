import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CoinLayout from './Components/CoinLayout.js';
import axios from 'axios';
import 'typeface-roboto';

class App extends Component {
  
  state = {
    loaded: false,
		allSymbols: {}

  }

  async getMarketData() {
    try {

			const allSymbolsResponse = {};
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

			const bittrexResponse = await axios.get('http://localhost:8080/binance');
			const bittrexData = bittrexResponse.data;

			bittrexData.forEach((bittrex) => {
				if (allSymbolsResponse[bittrex.symbol]) {
					allSymbolsResponse[bittrex.symbol]['bittrex'] = bittrex.price;
				} else {
					allSymbolsResponse[bittrex.symbol] = {};
					allSymbolsResponse[bittrex.symbol]['bittrex'] = bittrex.price;
				}
			});
      
      const okexResponse = await axios.get('http://localhost:8080/okex');
			const okexData = okexResponse.data;

			okexData.forEach((okex) => {
				if (allSymbolsResponse[okex.symbol]) {
					allSymbolsResponse[okex.symbol]['okex'] = okex.price;
				} else {
					allSymbolsResponse[okex.symbol] = {};
					allSymbolsResponse[okex.symbol]['okex'] = okex.price;
				}
			});

      this.setState({
        allSymbols: {...allSymbolsResponse},
        loaded: true
      }) 

    } catch (error) {
      console.error(error);
    }
  }

  componentWillMount() {
    this.getMarketData()
  }
  render() {
		console.log(this.state)
      return this.state.loaded === true ? (
        <React.Fragment>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Cryptocurrency Arbitrage</h1>
            </header>
          </div>
        <CoinLayout allSymbols={this.state.allSymbols} />
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
            <img src="https://citypetfood.com/media/theme/default/loader2.gif" alt='loading'/>
            <p>Loading Coins...</p>
          </div>
        </React.Fragment>
      )
  }
}

export default App;