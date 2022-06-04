import React, { useState } from 'react'

function BuyStocks() {
  const [symbol, setSymbol] = useState("")

  const handleOnSubmit = (e) => {
    e.preventDefault();
    
  }

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <input type="text" name="symbol" value={symbol} onChange={(e)=>{setSymbol(e.target.value)}}/>
        <input type="submit" value="search" />
      </form>
      {symbol != "" && <button>Buy</button>}
    </>
  )
}

export default BuyStocks