import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Coin from './Coin';

function App() {
  // State for coins and search logic
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Search engine logic

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1>Search a currency</h1>
        <form>
          <div className='input-wrapper'>
            {/* We use onChange to invoke the search as we type in values. The submit button here actually isn't even needed  */}
            <input
              onChange={handleChange}
              type='text'
              className='coin-input'
              placeholder='search'
            ></input>
          </div>
          <button className='btn'>
            <submit className='sbmt'>Submit</submit>
          </button>
        </form>
        <div className='data-wrapper'>
          {/* We map through 'filteredCoins', not our normal 'coins' state variable. All coins will be generated below as rows if nothing is in the search bar. As soon as something is typed into our search bar which has an onChange, our '.includes()' contained in our filteredCoins function targets what the user typed into the search bar and only those filtered results render. */}
          {filteredCoins.map((coin) => {
            return (
              <Coin
                key={coin.id}
                name={coin.name}
                image={coin.image}
                symbol={coin.symbol}
                marketcap={coin.market_cap}
                price={coin.current_price}
                priceChange={coin.price_change_percentage_24h}
                volume={coin.total_volume}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
