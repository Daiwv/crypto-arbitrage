import React from 'react';
import 'typeface-roboto'


const CoinLayout = (props) => {
	const symbols = props.allSymbols.map((e, i) =>(<div key={i}>{e}</div>))
	
    
    return (
        <div>
					{ symbols }
					hi
        </div>
    )
};

export default CoinLayout;	