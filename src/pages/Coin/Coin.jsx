import React, { useState, useContext, useEffect } from 'react';
import './Coin.css';
import { useParams } from 'react-router';
import { CoinContex } from '../../Context/CoinContext';
import LineChart from '../../component/LineChart/LineChart';

const Coin = () => {
  const {coinId} = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState()
  const {currency} = useContext(CoinContex);

  // Fetch the coin data 
  const fetchCoinData = async()=>{
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json', 
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => setCoinData(json))
      .catch(err => console.error(err));
  }

  // Fetch coin historical data
  const fetchHistoricalData = async ()=>{
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`;
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', }
    };
    fetch(url, options)
      .then(res => res.json())
      .then(json => setHistoricalData(json))
      .catch(err => console.error(err));
  }

  useEffect(()=>{
    fetchCoinData();
    fetchHistoricalData();
  }, [currency, coinId]);

  if(coinData && coinData.image && historicalData){
    return (
      <div className='coin'>
        <div className="coin-name">
          <img src={coinData.image?.large} alt="" />
          <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
        </div>
        <div className="coin-chart">
          <LineChart historicalData={historicalData}/>
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Crypto Market Rank</li>
            <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>Crypto Market Rank</li>
            <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hours High</li>
            <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hours Low</li>
            <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
          </ul>
        </div>
      </div>
    )
  }else{
    return(
      <div className="spinner">
        <div className="spin"></div>
      </div>
    )
  }

}

export default Coin
