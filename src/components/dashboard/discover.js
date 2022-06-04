import React from 'react'
import BuyStocks from './discover/buyStocks'
import SellStocks from './discover/sellStocks'

function Discover() {
  return (
    <div className='basis-10/12 border-slate-800 border-2 flex flex-col'>
      Discover
      <BuyStocks/>
      <SellStocks/>
    </div>
  )
}

export default Discover