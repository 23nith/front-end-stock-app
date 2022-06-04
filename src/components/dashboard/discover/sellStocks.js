import React, { useCallback, useContext, useEffect, useState } from 'react'
import { StocksContext } from '../../../contexts/StocksContext'

function SellStocks() {
  const {userStocks, setUserStocks, fetchUserStocks} = useContext(StocksContext)
  // const [userStocks, setUserStocks] = useState([])
  const [stockToSell, setStockToSell] = useState("")
  const [stockInfo, setStockInfo] = useState("")
  const [stockCount, setStockCount] = useState(1)

  
  const onMount =  useCallback(
    () => {
      fetch("http://localhost:3000/stocks", {
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
        setUserStocks(data);
      })
    },
    [stockToSell]
  )
  
  useEffect(() => {
    onMount();
  }, [])
  
  useEffect(() => {
    if(stockToSell !== ""){
      fetch("http://localhost:3000/stock_info", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify({
          stock: {
            ticker: stockToSell,
          },
        }),
      })
      .then((res) => {
        if (res.ok) {
          // console.log("response: ", res);
        }
        return res.json();
      })
      .then((data) => {
        // console.log("data: ", data);
        setStockInfo(data);
      })
    
    }

    onMount();
  }, [stockToSell])

  const handleSelect = (e, key) => {
    console.log("key: ", key)
    setStockToSell(key)
  }
  
  const handleOnSubmitSell = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/transactions", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({
        transaction: {
          symbol: stockToSell,
          count: stockCount,
          transaction_type: "sell"
        },
      }),
    })
    .then((res) => {
      if (res.ok) {
        fetchUserStocks("sold");
        return res.json();
      } else {
        throw new Error(res);
      }
    })
    setStockToSell("")
    
  }

  return (
    <div className='basis-3/6 flex border-slate-800 border-2'>

      <div className='basis-9/12 border-slate-800 border-2'>
        Sell from portfolio
        <table className='min-w-full'>
          <thead className='border-b'>
            <tr>
              <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Ticker</th>
              <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Investment Value</th>
              <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>Shares Owned</th>
            </tr>
          </thead>
          <tbody>
            {userStocks && userStocks.map((stock) => (
              <tr key={stock.ticker} >
                <td>{stock.ticker}</td>
                <td>{stock.investment_value}</td>
                <td>{stock.shares_owned}</td>
                <td><button onClick={(e)=>{handleSelect(e, stock.ticker)}} 
                  className='rounded bg-sky-500/100 w-24 p-1 text-white'
                >Select</button></td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      <div className='basis-3/12 border-slate-800 border-2'>
        {
          stockToSell !== "" &&
          <>
            {stockToSell}
            <form className='flex flex-col' onSubmit={handleOnSubmitSell}>
              <div>company name: {stockInfo.company_name}</div>
              <div>previous close: {stockInfo.previous_close}</div>
              <div>calculation price: {stockInfo.calculation_price}</div>
              <div>latest price: {stockInfo.latest_price}</div>
              <div>count: 
                <input type="number" 
                  className='rounded-md border-slate-800 border-2 m-2 p-1 w-24'
                  defaultValue={1}
                  min="1"
                  max="10"
                  onChange={(e)=>{setStockCount(e.target.value)}}
                />
              </div>
              <div>
                <input type="submit" value="Sell"
                  className='rounded bg-sky-500/100 w-24 p-1 text-white'
                />
              </div>
            </form>
          </>
        }
      </div>

    </div>
    
  )
}

export default SellStocks