import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import {doc , onSnapshot , updateDoc} from 'firebase/firestore'
import { db } from '../firebase'
import { UserAuth } from '../context/AuthContext'
import Swal from 'sweetalert2'

const SavedCoin = () => {
  const [coins , setCoins] = useState([])
  const {user} = UserAuth()

  useEffect(() => {
    onSnapshot(doc(db , 'users' , `${user?.email}`) , (doc) => {
      setCoins(doc.data()?.watchList)
    })
  } , [user?.email])

  const coinPath = doc(db , 'users' , `${user?.email}`)
  const deleteCoin = async (passedid) => {
    try {
      const result = coins.filter((coin) => coin.id !== passedid)
      await updateDoc(coinPath , {
        watchList: result
      })

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Coin removed from your watchlist',
        html: '<hr class="my-horizontal-line">',
        showConfirmButton: false,
        timer: 500,
        customClass: {
          popup: 'small-alert'
        }
      });
    } catch (error) {
      console.log(error)
    } 
  }
  return (
    <div>
      {coins.length === 0 ? (
       <p>You have not saved any coin yet. <Link to={'/'}>Click here to search coins</Link></p>
      ): (
        <table className='w-full border-collapse text-center'>
          <thead>
            <tr className='border-b'>
              <th className='px-4'>Rank #</th>
              <th className='text-left'>Coin</th>
              <th className='text-left'>Remove</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr className='h-[60px] overflow-hidden' key={coin.id}>
                <td>{coin?.rank}</td>
                <td>
                  <Link to={`/coin/${coin.id}`} state={{ coin }}>
                    <div className="flex items-center">
                      <img
                        className="w-8 mr-4 rounded-full"
                        src={coin?.image}
                        alt={coin?.name}
                      />
                      <div>
                      <p className='hidden sm:table-cell'>{coin?.name}</p>
                      <p className='text-left text-sm text-[#9CA3AF]'>{coin?.symbol}</p>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className='pl-8'>
                  <AiOutlineClose onClick={() => deleteCoin(coin?.id)} className="cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
    </div>
  )
}

export default SavedCoin
