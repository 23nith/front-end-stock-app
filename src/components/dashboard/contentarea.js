import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { UserContext } from '../../contexts/UserContext'
import Chart from './contentarea/chart'
import Stocksquery from './contentarea/stocksquery'
import TrendingStocks from './contentarea/trendingStocks'
import Portfolio from './portfolio'

function Contentarea() {
  const {currentUser} = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    if(currentUser.role == "admin"){
      console.log("must redirect")
      history.push("/front-end-stock-app/management")
    }
  }, [currentUser])
  useEffect(() => {
    if(currentUser.role == "admin"){
      console.log("must redirect")
      history.push("/front-end-stock-app/management")
    }
  }, [])
  
  return (
    <div className='basis-10/12 border-slate-800 border-2 flex flex-col overflow-y-scroll overflow-x-hidden'>
      Contentarea
      <div className='basis-1/2 border-slate-800 border-2 flex flex-row'>
        <Stocksquery/>
        <TrendingStocks/>
      </div>
      <div className='basis-1/2 border-slate-800 border-2 flex flex-row'>
        <div className='basis-3/4 border-slate-800 border-2'>
          <Portfolio/>
        </div>
        <Chart/>
      </div>
    </div>
  )
}

export default Contentarea