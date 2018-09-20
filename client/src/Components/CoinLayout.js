import React from 'react';

const CoinLayout = (props) => {
    let binanceCoin = props.binanceSymbols.map((coin) => (
        <div>
            <p>{coin.symbol} | {coin.price}</p>
        </div>
    ))

    let bittrexCoin = props.bittrexSymbols.map((coin) => (
        <div>
            <p>{coin.symbol} | {coin.price}</p>
        </div>
    ))

    let okexCoin = props.okexSymbols.map((coin) => (
        <div>
            <p>{coin.symbol} | {coin.price}</p>
        </div>
    ))
    
    return (
        <div>
            <p>Binance Coins: </p>
            { binanceCoin }
            <br />
            <p>Bittrex Coins: </p>
            { bittrexCoin }
            <br />
            <p>OKEx Coins: </p>
            { okexCoin }
        </div>
    )
}

export default CoinLayout;