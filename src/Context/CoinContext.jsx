import { createContext, useEffect, useState } from "react";

export const CoinContex = createContext();

const CoinContexProvider = (props)=>{

    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    });

    const fetchAllCoin = async ()=>{
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`;
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': import.meta.env.VITE_API_KEY
        }
        };

        fetch(url, options)
        .then(res => res.json())
        .then(json => setAllCoin(json))
        .catch(err => console.error(err));
    }


useEffect(()=>{
    fetchAllCoin();
}, [currency])

    const contextValue = {
        allCoin, currency, setCurrency
    }

    return(
        <CoinContex.Provider value={contextValue}>
            {props.children}
        </CoinContex.Provider>
    )
}

export default CoinContexProvider;