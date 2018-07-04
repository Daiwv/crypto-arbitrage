import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BinanceLayout from './Components/BinanceLayout.js';
import axios from 'axios';

class App extends Component {
  
  state = {
    loaded: false,
    symbols: []
  }

  async getBinanceData() {
    try {
      const response = await axios.get('http://localhost:8080/binance');
      setInterval(this.setState({ loaded: true}), 3000)
      console.log(response.data.symbols)
      // this.setState({ loaded: true})     
      // this.setState({ symbols: response.data.symbols})
    } catch (error) {
      console.error(error);
    }
  }

  componentWillMount() {
    this.getBinanceData()
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
        <BinanceLayout symbols={this.state.symbols} />
        {/* <p> {this.state.symbols} </p> */}
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
