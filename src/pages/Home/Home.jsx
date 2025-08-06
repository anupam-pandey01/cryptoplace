import React, { useContext, useEffect, useState } from 'react';
import "./Home.css";
import { CoinContex } from '../../Context/CoinContext';

const Home = () => {
  const {allCoin, currency} = useContext(CoinContex);
  const [displayCoin, setDisplayCoin] = useState([]);

useEffect(()=>{
  setDisplayCoin(allCoin);
}, [allCoin, currency])
  return (
    <div className='home'>
      <div className='hero-section'>
          <h1>Largest <br /> Crypto Marketplace</h1>
          <p>Welcome to the world's largest cryptocurrency marketplace.  Sign up to explore more about cryptos.</p>
        <form>
          <input type="text" placeholder='Search cryptos..'/>
          <button type='submit'>Search</button>
        </form>
      </div>
      <div className='coin-display'>
        <div className='layout'>
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{textAlign: "center"}}>24H Changes</p>
          <p className='market-cap'>Market Cap</p>
        </div>
        
        {displayCoin.slice(0, 10).map((coin, index)=>{
         return(
          <div className='layout' key={index}>
            <p>{coin.market_cap_rank}</p>
            <p><img src={coin.image} alt="" /> <span>{coin.id}</span></p>
            <p>{coin.current_price} <span>{currency.symbol}</span></p>
            <p style={{textAlign: "center"}}>24H Changes</p>
            <p className='market-cap'>{coin.market_cap}</p>
          </div>
         )
        })}
      </div>
    </div>
  )
}

export default Home
