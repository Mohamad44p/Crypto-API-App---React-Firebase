import { useEffect, useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './routes/Home'
import Signin from './routes/Signin'
import Signup from './routes/Signup'
import Account from './routes/Account'
import CoinPage from './routes/CoinPage'
import axios from 'axios'
import Footer from './components/Footer'
import {AuthContextProvider} from './context/AuthContext'
function App() {
  const [coins, setCoins] = useState([])
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en'

  useEffect(() => {
    const cachedCoins = localStorage.getItem('coinsData');
    if (cachedCoins) {
      setCoins(JSON.parse(cachedCoins));
    } else {
      axios.get(url)
        .then((response) => {
          setCoins(response.data);
          localStorage.setItem('coinsData', JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log('Oops, there was an error', error);
        });
    }
  }, [url]);
  return (
    <ThemeProvider>
      <AuthContextProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home coins={coins} />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
        <Route path='/coin/:coinId' element={<CoinPage/>}>
          <Route path=":coinId"/>
        </Route>
      </Routes>
      <Footer/>
      </AuthContextProvider>
    </ThemeProvider>
  )
}

export default App
