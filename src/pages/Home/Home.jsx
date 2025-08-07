import React, { useContext, useEffect, useState } from 'react';
import "./Home.css";
import { CoinContex } from '../../Context/CoinContext';
import { Link } from 'react-router';

const Home = () => {
  const {allCoin, currency} = useContext(CoinContex);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');

  const inputHandler = (e)=>{
    setInput(e.target.value);
    if(e.target.value == ""){
      setDisplayCoin(allCoin)
    }
  }

  const searchHandler = async (e)=>{
    e.preventDefault();
    const coins = await allCoin.filter((item)=>{
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplayCoin(coins)
  }
useEffect(()=>{
  setDisplayCoin(allCoin);
}, [allCoin, currency])
  return (
    <div className='home'>
      <div className='hero-section'>
          <h1>Largest <br /> Crypto Marketplace</h1>
          <p>Welcome to the world's largest cryptocurrency marketplace.  Sign up to explore more about cryptos.</p>
        <form onSubmit={searchHandler}>
          <input type="text" value={input} list='coinlist' placeholder='Search cryptos..' onChange={inputHandler} required/>
          
          <datalist id='coinlist'>
            {allCoin.map((item, index)=>(<option key={index} value={item.name}/>))}
          </datalist>
          
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
          <Link to={`/coin/${coin.id}`} className='layout' key={index}>
            <p>{coin.market_cap_rank}</p>
            <div>
              <img src={coin.image} alt="" />
              <p>{coin.name + " - " + coin.symbol}</p>
            </div>
            <p>{currency.symbol} {coin.current_price.toLocaleString()}</p>
            <p style={{textAlign: "center"}} className={coin.price_change_percentage_24h > 0 ?"green":'red'}>{Math.floor(coin.price_change_percentage_24h * 100)/100}</p>
            <p className='market-cap'>{currency.symbol} {coin.market_cap.toLocaleString()}</p>
          </Link>
         )
        })}
      </div>
    </div>
  )
}

export default Home
