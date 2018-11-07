import React from 'react';


const CoinLayout = (props) => {
  
  const displaySymbols = () => {
    const marketData = Object.entries(props.allSymbols)
    for (const [symbol, exchange] of marketData) {
      <p>`${symbol} is being sold on ${exchange.binance}`</p>
    }
  }
    
    return (
        <div>
					{displaySymbols}
        </div>
    )
};

export default CoinLayout;	