import React, { useContext, useState } from 'react'
import { StocksContext } from '../../../contexts/StocksContext'

function BuyStocks() {
  const [symbol, setSymbol] = useState("")
  const [stockInfo, setStockInfo] = useState("")
  const [stockCount, setStockCount] = useState(1)
  const {fetchUserStocks} = useContext(StocksContext)

  const handleOnSubmitSearch = (e) => {
    e.preventDefault();
    
    fetch("http://localhost:3000/stock_info", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify({
          stock: {
            ticker: symbol,
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
        console.log("data: ", data);
        setStockInfo(data);
      })
  }

  const handleOnSubmitBuy = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/transactions", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify({
          transaction: {
            symbol: symbol,
            count: stockCount,
            transaction_type: "buy"
          },
        }),
      })
      .then((res) => {
        if (res.ok) {
          console.log(res)
          fetchUserStocks("bought");
          setStockInfo("");
          return res.json();
        } else {
          throw new Error(res);
        }
      })
  }

  return (
    <div className='basis-3/6 border-slate-800 border-2'>
      <form onSubmit={handleOnSubmitSearch}>
        <h2>Search to buy stocks</h2>
        <input placeholder='Type symbol here' type="text" name="symbol" value={symbol} 
          onChange={(e)=>{setSymbol(e.target.value.toUpperCase())}} 
          className='rounded-md border-slate-800 border-2 m-2 p-1'/>
        <input type="submit" value="search" className='rounded bg-sky-500/100 w-24 p-1 text-white' />
      </form>

      {stockInfo != "" && 
        <form className='flex flex-col' onSubmit={handleOnSubmitBuy}>
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
            <input type="submit" value="Buy"
              className='rounded bg-sky-500/100 w-24 p-1 text-white'
            />
          </div>
        </form>
      }

      
    </div>
  )
}

export default BuyStocks