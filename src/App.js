import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Coin from './Coin';

function App() {
  // State for coins and search logic
  const [coins, setCoins] = useState([]); // coins will be set with data from our initial response.
  const [search, setSearch] = useState(''); // search will be set with handleChange as our search parameter. We use this to get a filtered result from coins.

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // The handle change will be used to dynamically change our search variable to match whatever is typed in the search bar.
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  
  //Make our seach param and our data lower case, then map through our coins response data and check if coin.name includes what we have typed in our search.
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()) //
  );

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1>Search a currency</h1>
        <form>
          <div className='input-wrapper'>
            {/* We set onChange to our handleChange funtion to invoke the search as we type in values. The submit button here actually isn't even needed  */}
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
          {/* We actually map through our filteredCoins variable by default to generate the coins the user sees on the page, not our normal 'coins' state variable. We can do this because if nothing is typed in the search bar, the search param variable will be set to an empty string and filteredResults will just display all results. As soon as something is typed into our search bar which has an onChange, the search variable is updated, and is then used to update search results. */}
          {filteredCoins.map((coin) => {
            return (
              <Coin //Coin is our component we imported
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
