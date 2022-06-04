import React, { useContext, useEffect, useState } from 'react'
import { GraphContext } from '../../../contexts/GraphContext'
import { TopTenContext } from '../../../contexts/TopTenContext'

function TrendingStocks() {
  const {topTen, setTopTen} = useContext(TopTenContext)
  const {setSymbol, setChartLabel} = useContext(GraphContext)
  const [stocks, setStocks] = useState([])

  useEffect(() => {
    const onMount = async () => {
      fetch("http://localhost:3000/top_ten", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        }
      })
      .then((res) => {
        if (res.ok) {
          // console.log("response: ", res);
        }
        return res.json();
      })
      .then((data) => {
        // console.log("data: ", data);
        // setStocks(data);
        setTopTen(data);
      })
    }
  
    onMount();
  }, [])

  const handleOnClick = (e, symbol) => {
    setSymbol(symbol);
    setChartLabel(symbol);
    console.log("ticker: ", symbol );
  }
  
  return (
    <div className='basis-1/4 border-slate-800 border-2'>
      TrendingStocks
      <table className='min-w-full'>
        <thead className='border-b'>
          <tr>
            <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Ticker</th>
            <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Latest</th>
            <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>High</th>
            <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Low</th>
            <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Close</th>
          </tr>
        </thead>
        <tbody>
          {topTen && topTen.map((stock) => (
            <tr key={stock.id}>
              <td onClick={(e) => {handleOnClick(e, stock.symbol)}} className="cursor-pointer">{stock.symbol}</td>
              <td>{stock.latest_price}</td>
              <td>{stock.week_52_high}</td>
              <td>{stock.week_52_low}</td>
              <td>{stock.previous_close}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TrendingStocks