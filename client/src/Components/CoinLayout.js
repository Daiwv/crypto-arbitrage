import React from 'react';
import 'typeface-roboto'


const CoinLayout = (props) => {
	let symbols = props.allSymbols
	
    
    return (
        <div>
					{ symbols }
        </div>
    )
}

export default CoinLayout;