import React from 'react';

const CoinLayout = (props) => {
    return (
        <div>
					{props.allResults.map((result) => (
      				<p>{ result }</p>
					))}
        </div>
    )
};

export default CoinLayout;	


// `${obj.symbol} is being sold on{Object.keys(obj.exchange)}`