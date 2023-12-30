import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { UserAuth } from "../context/AuthContext";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import Swal from 'sweetalert2'
import { AiFillStar, AiOutlineStar } from "react-icons/ai";


const CoinItem = ({ coin }) => {
  const [savedCoin, setSavedCoin] = useState(false);
  const { user } = UserAuth();
  const coinPath = doc(db, "users", `${user?.email}`);

  const saveCoin = async () => {
    if (user?.email) {
      setSavedCoin(true);
      await updateDoc(coinPath, {
        watchList: arrayUnion({
          id: coin.id,
          name: coin.name,
          image: coin.image,
          rank: coin.market_cap_rank,
          symbol: coin.symbol,
        }),
      });

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your coin has been saved',
        html: '<hr class="my-horizontal-line">',
        showConfirmButton: false,
        timer: 500,
        customClass: {
          popup: 'small-alert'
        }
      });
    }else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please login to save a coin',
        footer: '<a href="/signin" style="color: #ab0a0a; text-decoration: underline; cursor: pointer;">Click here to sign in</a>'
      });
    }
  };

  return (
    <>
      <tr className="h-[80px] border-b overflow-hidden">
      <td onClick={saveCoin}>
          {savedCoin ? (
            <AiFillStar className="cursor-pointer" />
          ) : (
            <AiOutlineStar className="cursor-pointer" />
          )}
        </td>
        <td>{coin.market_cap_rank}</td>
        <td>
          <Link to={`/coin/${coin.id}`}>
            <div className="flex items-center">
              <img
                className="w-6 mr-2 rounded-full"
                src={coin.image}
                alt={coin.id}
              />
              <p className="hidden sm:table-cell">{coin.name}</p>
            </div>
          </Link>
        </td>
        <td>{coin.symbol.toUpperCase()}</td>
        <td>{coin.current_price}</td>
        <td className="">
          {coin.price_change_percentage_24h > 0 ? (
            <p className="text-[#14b8a6]">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          ) : (
            <p className="text-[#f00606]">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          )}
        </td>
        <td className="hidden md:table-cell">
          {coin.total_volume.toLocaleString()}
        </td>
        <td className="hidden sm:table-cell">
          {coin.market_cap.toLocaleString()}
        </td>
        <td>
          {coin.sparkline_in_7d && coin.sparkline_in_7d.price ? (
            <Sparklines data={coin.sparkline_in_7d.price}>
              <SparklinesLine color="teal" />
            </Sparklines>
          ) : (
            <span className="text-[10px] md:text-xl">No sparkline data</span>
          )}
        </td>
      </tr>
    </>
  );
};

export default CoinItem;
