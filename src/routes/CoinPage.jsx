import React , { useEffect , useState } from 'react'
import axios from 'axios'
import { Sparklines, SparklinesLine } from 'react-sparklines'
import {FaTwitter , FaFacebook , FaReddit , FaGithub} from 'react-icons/fa'
import { useParams } from 'react-router-dom'
const CoinPage = () => {
  const [coin , setCoin] = useState({})
  const params = useParams()

  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&sparkline=true`
  useEffect(() => {
    axios.get(url).then((response) => {
      setCoin(response.data)
    })
  }, [url])
  return (
    <div className='rounded-div my-12 py-8'>
      <div className='flex py-8'>
        <img className='w-20 mr-8' src={coin.image?.large} alt={coin.name} />
        <p className='text-3xl'>{coin?.name}</p>
        <p>{coin?.symbol ? coin.symbol.toUpperCase() : ''} / USD</p>
      </div>

      <div className='grid md:grid-cols-2 gap-8'>
        <div>
          <div className='flex justify-between'>
            {coin.market_data?.current_price ? (<p className='text-3xl font-bold'>${coin.market_data.current_price.usd.toLocaleString()}</p>): (<p>No Data</p>)}
            <p>7 Days</p>
          </div>
          <div>
            <Sparklines data={coin.market_data?.sparkline_7d.price}>
              <SparklinesLine color='teal'/>
            </Sparklines>
          </div>
          <div className='flex justify-between py-4'>
            <div>
              <p className='text-[#6e8098] text-sm'>Market Cap</p>
              {coin.market_data?.market_cap ? (<p>${coin.market_data.market_cap.usd.toLocaleString()}</p>): (<p>No Data</p>)}
            </div>
            <div>
              <p className='text-[#6e8098] text-sm'>Volume (24h)</p>
              {coin.market_data?.market_cap ? (<p>${coin.market_data.total_volume.usd.toLocaleString()}</p>): (<p>No Data</p>)}
            </div>
          </div>
          <div className='flex justify-between py-4'>
            <div>
              <p className='text-[#6e8098] text-sm'>24h High</p>
              {coin.market_data?.high_24h ? (<p>${coin.market_data.high_24h.usd.toLocaleString()}</p>): (<p>No Data</p>)}
            </div>
            <div>
              <p className='text-[#6e8098] text-sm'>24h Low</p>
              {coin.market_data?.low_24h ? (<p>${coin.market_data.low_24h.usd.toLocaleString()}</p>): (<p>No Data</p>)}
            </div>
          </div>
        </div>
        <div>
          <p className='text-xl font-bold'>Market Stats</p>
          <div className='flex justify-between py-4'>
            <div>
              <p className='text-[#6e8098] text-sm'>Market Rank</p>
              {coin.market_cap_rank ? (<p>{coin.market_cap_rank}</p>): (<p>No Data</p>)}
            </div>
            <div>
              <p className='text-[#6e8098] text-sm'>Hashing Algorithm</p>
              {coin.hashing_algorithm ? (<p>{coin.hashing_algorithm}</p>): (<p>No Data</p>)}
            </div>
            <div>
              <p className='text-[#6e8098] text-sm'>Trust Score</p>
              {coin.liquidity_score ? (<p>{coin.liquidity_score.toFixed(2)}</p>): (<p>No Data</p>)}
            </div>
          </div>
          <div>
            <div className='flex justify-between py-4'>
              <div>
                <p className='text-[#6e8098] text-sm'>Price Change (24h)</p>
                {coin.market_data?.price_change_percentage_24h ? (<p>{coin.market_data.price_change_percentage_24h.toFixed(2)}%</p>): (<p>No Data</p>)}
              </div>
              <div>
                <p className='text-[#6e8098] text-sm'>Price Change (7d)</p>
                {coin.market_data?.price_change_percentage_7d_in_currency ? (<p>{coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(2)}%</p>): (<p>No Data</p>)}
              </div>
              <div>
                <p className='text-[#6e8098] text-sm'>Price Change (14d)</p>
                {coin.market_data?.price_change_percentage_14d_in_currency ? (<p>{coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(2)}%</p>): (<p>No Data</p>)}
              </div>
            </div>
            <div className='flex justify-between py-4'>
              <div>
                <p className='text-[#6e8098] text-sm'>Price Change (30d)</p>
                {coin.market_data?.price_change_percentage_30d_in_currency ? (<p>{coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(2)}%</p>): (<p>No Data</p>)}
              </div>
              <div>
                <p className='text-[#6e8098] text-sm'>Price Change (60d)</p>
                {coin.market_data?.price_change_percentage_60d_in_currency ? (<p>{coin.market_data.price_change_percentage_60d_in_currency.usd.toFixed(2)}%</p>): (<p>No Data</p>)}
              </div>
              <div>
                <p className='text-[#6e8098] text-sm'>Price Change (1y)</p>
                {coin.market_data?.price_change_percentage_1y_in_currency ? (<p>{coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(2)}%</p>): (<p>No Data</p>)}
              </div>
            </div>
            <div className='flex justify-around p-8 text-accent'>
              <FaTwitter/>
              <FaFacebook/>
              <FaReddit/>
              <FaGithub/>
            </div>
          </div>
        </div>
      </div>
      <div className='p-8 rounded-div hover:scale-105 ease-in-out duration-300 md:w-full overflow-auto'>
        <p className='text-xl font-bold'>About {coin.name}</p>
        <p className='text-xl sm:text-sm '>{coin.description ? (coin.description.en.split('.').slice(0, -1).join('.')) : (<p>No Data</p>)}</p>
      </div>
    </div>
  )
}

export default CoinPage
