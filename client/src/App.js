import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CoinLayout from './Components/CoinLayout.js';
import axios from 'axios';

class App extends Component {
  
  state = {
    loaded: false,
    binanceSymbols: [],
    bittrexSymbols: []
  }

  async getMarketData() {
    try {
      const binanceResponse = await axios.get('http://localhost:8080/binance');
      let binanceSymbols = binanceResponse.data.map((coin) => (
          {symbol: coin.symbol,
          price: coin.price}
      ))
      const bittrexResponse = await axios.get('http://localhost:8080/bittrex');
      let bittrexSymbols = bittrexResponse.data.map((coin) => (
          {symbol: coin.symbol,
          price: coin.price}
      ))
      const okexResponse = await axios.get('http://localhost:8080/okex');
      let okexSymbols = okexResponse.data.map((coin) => (
          {symbol: coin.symbol,
          price: coin.price}
      ))         
      this.setState({
        binanceSymbols,
        bittrexSymbols,
        okexSymbols,
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
      return this.state.loaded === true ? (
        <React.Fragment>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Cryptocurrency Arbitrage</h1>
            </header>
          </div>
        <CoinLayout binanceSymbols={this.state.binanceSymbols} bittrexSymbols={this.state.bittrexSymbols} okexSymbols={this.state.okexSymbols} />
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
