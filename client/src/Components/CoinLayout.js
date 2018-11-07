import React from 'react';

const CoinLayout = (props) => {
    return (
        <div>
					{props.allSymbols.map((obj) => (
      				<p>`${obj.symbol} is being sold on ${obj.exchange.binance}`</p>
					))}
        </div>
    )
};

export default CoinLayout;	